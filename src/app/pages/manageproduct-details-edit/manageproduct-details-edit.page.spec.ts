import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageproductDetailsEditPage } from './manageproduct-details-edit.page';

describe('ManageproductDetailsEditPage', () => {
  let component: ManageproductDetailsEditPage;
  let fixture: ComponentFixture<ManageproductDetailsEditPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageproductDetailsEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageproductDetailsEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
