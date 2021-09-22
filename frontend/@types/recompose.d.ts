//TODO: just remove this if I don't end up using it

/*
import * as React from "react";
import { BaseFieldProps, GenericField, WrappedFieldProps } from "redux-form";

declare module "redux-form" {
  export class Field<P = any>
    extends React.Component<BaseFieldProps<P> & P>
    implements GenericField<P>
  {
    dirty: boolean;
    name: string;
    pristine: boolean;
    value: any;
    getRenderedComponent(): React.Component<WrappedFieldProps & P>;
  }
}
*/
