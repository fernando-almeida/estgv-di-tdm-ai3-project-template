import { SubscriptionLike } from 'rxjs';

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: UserFilterComponent, multi: true },
  ]
})
export class UserFilterComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Output() search = new EventEmitter<Api.IUserFilter>();
  @Output() refresh = new EventEmitter<Api.IUserFilter>();

  filterForm = this.formBuilder.group({
    searchText: [null],
    nameContains: [null],
    emailContains: [null],
  });

  subscriptions: SubscriptionLike[];

  onChange: any;
  onTouched: any;

  /**
   * Constructor
   * @param formBuilder Form builder
   */
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.subscriptions = [
      this.filterForm.valueChanges.subscribe(this.handleFilterFormValueChanges.bind(this)),
    ];
  }

  ngOnDestroy(): void {
    (this.subscriptions || []).forEach(subscription => subscription.unsubscribe());
  }

  // #region "Control value accessor implementation"
  writeValue(obj: Api.IUserFilter): void {
    this.filterForm.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.filterForm.disable();
    } else {
      this.filterForm.enable();
    }
  }
  // #endregion

  private handleFilterFormValueChanges(formData: Api.IUserFilter) {
    if (this.onChange) { this.onChange(formData); }
    if (this.onTouched) { this.onTouched(formData); }
  }

  btnRefreshClicked(event: Event) {
    this.refresh.emit(this.filterForm.value);
  }

  btnSearchClicked(event: Event) {
    this.search.emit(this.filterForm.value);
  }

  btnClearClicked(event: Event) {
    this.filterForm.reset();
  }
}
