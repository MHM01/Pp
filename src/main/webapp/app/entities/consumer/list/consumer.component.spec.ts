import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ConsumerService } from '../service/consumer.service';

import { ConsumerComponent } from './consumer.component';

describe('Consumer Management Component', () => {
  let comp: ConsumerComponent;
  let fixture: ComponentFixture<ConsumerComponent>;
  let service: ConsumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'consumer', component: ConsumerComponent }]), HttpClientTestingModule],
      declarations: [ConsumerComponent],
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
      .overrideTemplate(ConsumerComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ConsumerComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ConsumerService);

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
    expect(comp.consumers?.[0]).toEqual(expect.objectContaining({ id: 'ABC' }));
  });

  describe('trackId', () => {
    it('Should forward to consumerService', () => {
      const entity = { id: 'ABC' };
      jest.spyOn(service, 'getConsumerIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getConsumerIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
