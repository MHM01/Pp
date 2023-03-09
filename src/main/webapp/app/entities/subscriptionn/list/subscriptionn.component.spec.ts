import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { SubscriptionnService } from '../service/subscriptionn.service';

import { SubscriptionnComponent } from './subscriptionn.component';

describe('Subscriptionn Management Component', () => {
  let comp: SubscriptionnComponent;
  let fixture: ComponentFixture<SubscriptionnComponent>;
  let service: SubscriptionnService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'subscriptionn', component: SubscriptionnComponent }]), HttpClientTestingModule],
      declarations: [SubscriptionnComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(SubscriptionnComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubscriptionnComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(SubscriptionnService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 'ABC' }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.subscriptionns?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to subscriptionnService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getSubscriptionnIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getSubscriptionnIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
