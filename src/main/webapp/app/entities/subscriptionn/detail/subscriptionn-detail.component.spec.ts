import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SubscriptionnDetailComponent } from './subscriptionn-detail.component';

describe('Subscriptionn Management Detail Component', () => {
  let comp: SubscriptionnDetailComponent;
  let fixture: ComponentFixture<SubscriptionnDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionnDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ subscriptionn: { id: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(SubscriptionnDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(SubscriptionnDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load subscriptionn on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.subscriptionn).toEqual(expect.objectContaining({ id: 'ABC' }));
    });
  });
});
