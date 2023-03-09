import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SubscriptionnFormService } from './subscriptionn-form.service';
import { SubscriptionnService } from '../service/subscriptionn.service';
import { ISubscriptionn } from '../subscriptionn.model';
import { ITopic } from 'app/entities/topic/topic.model';
import { TopicService } from 'app/entities/topic/service/topic.service';
import { IConsumer } from 'app/entities/consumer/consumer.model';
import { ConsumerService } from 'app/entities/consumer/service/consumer.service';

import { SubscriptionnUpdateComponent } from './subscriptionn-update.component';

describe('Subscriptionn Management Update Component', () => {
  let comp: SubscriptionnUpdateComponent;
  let fixture: ComponentFixture<SubscriptionnUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let subscriptionnFormService: SubscriptionnFormService;
  let subscriptionnService: SubscriptionnService;
  let topicService: TopicService;
  let consumerService: ConsumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SubscriptionnUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(SubscriptionnUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SubscriptionnUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    subscriptionnFormService = TestBed.inject(SubscriptionnFormService);
    subscriptionnService = TestBed.inject(SubscriptionnService);
    topicService = TestBed.inject(TopicService);
    consumerService = TestBed.inject(ConsumerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Topic query and add missing value', () => {
      const subscriptionn: ISubscriptionn = { id: 'CBA' };
      const id: ITopic = { id: '3a32fca4-5f32-44e4-af76-1ed63215c806' };
      subscriptionn.id = id;

      const topicCollection: ITopic[] = [{ id: '9cf04e31-a289-43bd-ab65-3088e1a42e48' }];
      jest.spyOn(topicService, 'query').mockReturnValue(of(new HttpResponse({ body: topicCollection })));
      const additionalTopics = [id];
      const expectedCollection: ITopic[] = [...additionalTopics, ...topicCollection];
      jest.spyOn(topicService, 'addTopicToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ subscriptionn });
      comp.ngOnInit();

      expect(topicService.query).toHaveBeenCalled();
      expect(topicService.addTopicToCollectionIfMissing).toHaveBeenCalledWith(
        topicCollection,
        ...additionalTopics.map(expect.objectContaining)
      );
      expect(comp.topicsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Consumer query and add missing value', () => {
      const subscriptionn: ISubscriptionn = { id: 'CBA' };
      const id: IConsumer = { id: '3db5e491-2058-4469-a549-db120f53030e' };
      subscriptionn.id = id;

      const consumerCollection: IConsumer[] = [{ id: '4e27181c-4d2f-45e3-b07c-b6528f25cf6c' }];
      jest.spyOn(consumerService, 'query').mockReturnValue(of(new HttpResponse({ body: consumerCollection })));
      const additionalConsumers = [id];
      const expectedCollection: IConsumer[] = [...additionalConsumers, ...consumerCollection];
      jest.spyOn(consumerService, 'addConsumerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ subscriptionn });
      comp.ngOnInit();

      expect(consumerService.query).toHaveBeenCalled();
      expect(consumerService.addConsumerToCollectionIfMissing).toHaveBeenCalledWith(
        consumerCollection,
        ...additionalConsumers.map(expect.objectContaining)
      );
      expect(comp.consumersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const subscriptionn: ISubscriptionn = { id: 'CBA' };
      const id: ITopic = { id: 'c06134c8-aabd-4cbb-ad50-cbbb91b4b62c' };
      subscriptionn.id = id;
      const id: IConsumer = { id: '8fa121ce-6903-4ed3-bd7b-d6456dcfa536' };
      subscriptionn.id = id;

      activatedRoute.data = of({ subscriptionn });
      comp.ngOnInit();

      expect(comp.topicsSharedCollection).toContain(id);
      expect(comp.consumersSharedCollection).toContain(id);
      expect(comp.subscriptionn).toEqual(subscriptionn);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubscriptionn>>();
      const subscriptionn = { id: 'ABC' };
      jest.spyOn(subscriptionnFormService, 'getSubscriptionn').mockReturnValue(subscriptionn);
      jest.spyOn(subscriptionnService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subscriptionn });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subscriptionn }));
      saveSubject.complete();

      // THEN
      expect(subscriptionnFormService.getSubscriptionn).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(subscriptionnService.update).toHaveBeenCalledWith(expect.objectContaining(subscriptionn));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubscriptionn>>();
      const subscriptionn = { id: 'ABC' };
      jest.spyOn(subscriptionnFormService, 'getSubscriptionn').mockReturnValue({ id: null });
      jest.spyOn(subscriptionnService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subscriptionn: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: subscriptionn }));
      saveSubject.complete();

      // THEN
      expect(subscriptionnFormService.getSubscriptionn).toHaveBeenCalled();
      expect(subscriptionnService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISubscriptionn>>();
      const subscriptionn = { id: 'ABC' };
      jest.spyOn(subscriptionnService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ subscriptionn });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(subscriptionnService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTopic', () => {
      it('Should forward to topicService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(topicService, 'compareTopic');
        comp.compareTopic(entity, entity2);
        expect(topicService.compareTopic).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareConsumer', () => {
      it('Should forward to consumerService', () => {
        const entity = { id: 'ABC' };
        const entity2 = { id: 'CBA' };
        jest.spyOn(consumerService, 'compareConsumer');
        comp.compareConsumer(entity, entity2);
        expect(consumerService.compareConsumer).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
