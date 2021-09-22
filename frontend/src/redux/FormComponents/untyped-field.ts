// temporarily turn off Typescript's clumsy type inference and type guarding

//TODO: find a better solution than simply giving up type security

//TODO: remove this if I don't use it

import { Field, GenericField } from "redux-form";
const UntypedField = Field as new () => GenericField<any>;
export { UntypedField as Field };
