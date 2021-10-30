import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { EventListGQL, EventListQuery, Role } from '@tumi/data-access';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { DateTime } from 'luxon';

@Component({
  selector: 'tumi-event-list-page',
  templateUrl: './event-list-page.component.html',
  styleUrls: ['./event-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListPageComponent implements OnDestroy {
  public events$: Observable<EventListQuery['events']>;
  public showFullEvents = new FormControl(true);
  public eventsAfter = new FormControl(
    DateTime.local().toISO({ includeOffset: false })
  );
  public Role = Role;
  private loadEventsQueryRef;
  private destroy$ = new Subject();

  constructor(private loadEventsQuery: EventListGQL, private title: Title) {
    this.title.setTitle('TUMi - events');
    this.loadEventsQueryRef = this.loadEventsQuery.watch();
    const events$ = this.loadEventsQueryRef.valueChanges.pipe(
      map(({ data }) => data.events)
    );
    this.eventsAfter.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => this.loadEventsQueryRef.refetch({ after: value.toJSDate() }));
    this.events$ = combineLatest([
      events$,
      this.showFullEvents.valueChanges.pipe(
        startWith(this.showFullEvents.value)
      ),
    ]).pipe(
      map(([events, showFull]) => {
        if (showFull) {
          return events;
        }
        return events.filter(
          (event) =>
            event.userIsOrganizer ||
            event.userRegistered ||
            event.participantLimit > event.participantsRegistered
        );
      })
    );
    this.loadEventsQueryRef.startPolling(10000);
  }

  ngOnDestroy() {
    this.loadEventsQueryRef.stopPolling();
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
