import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISubscriptionn } from '../subscriptionn.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../subscriptionn.test-samples';

import { SubscriptionnService } from './subscriptionn.service';

const requireRestSample: ISubscriptionn = {
  ...sampleWithRequiredData,
};

describe('Subscriptionn Service', () => {
  let service: SubscriptionnService;
  let httpMock: HttpTestingController;
  let expectedResult: ISubscriptionn | ISubscriptionn[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(SubscriptionnService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Subscriptionn', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const subscriptionn = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(subscriptionn).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Subscriptionn', () => {
      const subscriptionn = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(subscriptionn).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Subscriptionn', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Subscriptionn', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Subscriptionn', () => {
      const expected = true;

      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSubscriptionnToCollectionIfMissing', () => {
      it('should add a Subscriptionn to an empty array', () => {
        const subscriptionn: ISubscriptionn = sampleWithRequiredData;
        expectedResult = service.addSubscriptionnToCollectionIfMissing([], subscriptionn);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subscriptionn);
      });

      it('should not add a Subscriptionn to an array that contains it', () => {
        const subscriptionn: ISubscriptionn = sampleWithRequiredData;
        const subscriptionnCollection: ISubscriptionn[] = [
          {
            ...subscriptionn,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSubscriptionnToCollectionIfMissing(subscriptionnCollection, subscriptionn);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Subscriptionn to an array that doesn't contain it", () => {
        const subscriptionn: ISubscriptionn = sampleWithRequiredData;
        const subscriptionnCollection: ISubscriptionn[] = [sampleWithPartialData];
        expectedResult = service.addSubscriptionnToCollectionIfMissing(subscriptionnCollection, subscriptionn);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subscriptionn);
      });

      it('should add only unique Subscriptionn to an array', () => {
        const subscriptionnArray: ISubscriptionn[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const subscriptionnCollection: ISubscriptionn[] = [sampleWithRequiredData];
        expectedResult = service.addSubscriptionnToCollectionIfMissing(subscriptionnCollection, ...subscriptionnArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const subscriptionn: ISubscriptionn = sampleWithRequiredData;
        const subscriptionn2: ISubscriptionn = sampleWithPartialData;
        expectedResult = service.addSubscriptionnToCollectionIfMissing([], subscriptionn, subscriptionn2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(subscriptionn);
        expect(expectedResult).toContain(subscriptionn2);
      });

      it('should accept null and undefined values', () => {
        const subscriptionn: ISubscriptionn = sampleWithRequiredData;
        expectedResult = service.addSubscriptionnToCollectionIfMissing([], null, subscriptionn, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(subscriptionn);
      });

      it('should return initial array if no Subscriptionn is added', () => {
        const subscriptionnCollection: ISubscriptionn[] = [sampleWithRequiredData];
        expectedResult = service.addSubscriptionnToCollectionIfMissing(subscriptionnCollection, undefined, null);
        expect(expectedResult).toEqual(subscriptionnCollection);
      });
    });

    describe('compareSubscriptionn', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSubscriptionn(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = null;

        const compareResult1 = service.compareSubscriptionn(entity1, entity2);
        const compareResult2 = service.compareSubscriptionn(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'CBA' };

        const compareResult1 = service.compareSubscriptionn(entity1, entity2);
        const compareResult2 = service.compareSubscriptionn(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 'ABC' };
        const entity2 = { id: 'ABC' };

        const compareResult1 = service.compareSubscriptionn(entity1, entity2);
        const compareResult2 = service.compareSubscriptionn(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
