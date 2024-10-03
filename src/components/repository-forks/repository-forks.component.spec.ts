import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryForksComponent } from './repository-forks.component';

describe('RepositoryForksComponent', () => {
  let component: RepositoryForksComponent;
  let fixture: ComponentFixture<RepositoryForksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryForksComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RepositoryForksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
