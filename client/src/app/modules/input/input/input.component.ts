import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ValueTypeEnum } from 'src/app/enums/value-type';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor, OnInit  {
  @Input() label = '';
  @Input() type = 'text';
  @Input() valueType = ValueTypeEnum.Unknown;
  @Input() step: number | undefined = undefined;
  @Input() min: number | Date | null = null;
  @Input() max: number | Date | null = null;

  valueTypeEnum: typeof ValueTypeEnum = ValueTypeEnum;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.setControlType(this.valueType);
  }

  setControlType(valueTypeEnum: string) {
    switch (valueTypeEnum) {
      case ValueTypeEnum.Number:
        if (this.min === undefined || this.min === null || isNaN(+this.min))
          this.min = 0;
        if (this.step === undefined || this.step === null || isNaN(+this.step))
          this.step = 1;
        this.type = 'number';
        break;
      case ValueTypeEnum.Decimal:
        if (this.min === undefined || this.min === null || isNaN(+this.min))
          this.min = 0;
        if (this.step === undefined || this.step === null || isNaN(+this.step))
          this.step = 0.01;
        this.type = 'number';
        break;
      case ValueTypeEnum.Date:
        this.type = 'date';
        break;
      default:
        this.type = 'text';
        break;
    }
  }

  writeValue(obj: any): void {}

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
