/** @format */

import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QueryFn
} from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

export class DbCollectionBasisHelper<T> {
  private collection: AngularFirestoreCollection<T>;
  protected collectionPath: string;

  constructor(protected angularFirestore: AngularFirestore) {}

  protected setCollectionPath(path: string) {
    this.collectionPath = path;
    this.collection = this.angularFirestore.collection<T>(path);
  }

  getData(queryFn?: QueryFn): Observable<T[]> {
    return this.angularFirestore
      .collection<T>(this.collectionPath, queryFn)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(({ payload }) => {
            const id = payload.doc.id;
            const data: any = payload.doc.data() as T;

            if (data.date) {
              data.date = data.date.toDate();
            }

            return { id, ...data };
          })
        )
      );
  }

  add(data: T): Observable<T> {
    return from(this.collection.add(data)).pipe(
      map((doc: DocumentReference) => {
        const id = doc.id;
        return { id, ...(data as any) };
      })
    );
  }

  set(id: string, data: T): Observable<string> {
    const doc = this.doc(id);
    return from(doc.set(data)).pipe(map(() => id));
  }

  update(id: string, data: T): Observable<string> {
    const doc = this.doc(id);
    return from(doc.update(data)).pipe(map(() => id));
  }

  delete(id: string) {
    const doc = this.doc(id);
    return from(doc.delete()).pipe(map(() => id));
  }

  private doc(id: string) {
    return this.collection.doc(id);
  }
}
