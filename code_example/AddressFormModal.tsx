// import { Controller, useForm } from 'react-hook-form';
// import { Button } from './Button';
// import { IconSpinner } from './icons/IconSpinner';
// import { InputWrapper } from './InputWrapper';
// import CitySelect from './CitySelect';
// import { Switch } from '@headlessui/react';
// import { passportValidation, phoneValidation } from '../utils/validation';
// import InputPhone from './InputPhone';
// import FioInput from './FioInput';
// import InnInput from './InnInput';
// import React from 'react';
// import PassportInput from './PassportInput';

// type DataType = {
//   inn: string;
//   name: string;
// };

// type Form = {
//   name: string;
//   phone: string;
//   city: string;
//   type: 'legal' | 'individual';
//   company?: DataType;
//   passport?: string;
// };

// type NewForm = {
//   name: string;
//   phone: string;
//   city: string;
//   type: 'legal' | 'individual';
//   companyInn?: string;
//   companyName?: string;
//   passport?: string;
// };

// type AddressFormModalProps = {
//   buttonText: string;
//   buttonTextSubmit: string;
//   defaultValues?: Form;
//   onSubmit: (form: Form) => void;
// };
// export const AddressFormModal: React.FC<AddressFormModalProps> = (props) => {
//   const {
//     control,
//     formState: { errors, isSubmitting },
//     handleSubmit,
//     watch,
//     setValue,
//   } = useForm<Form>({
//     defaultValues: props.defaultValues
//       ? props.defaultValues
//       : {
//           type: 'individual',
//         },
//   });

//   const onSubmit = handleSubmit(async function (form: Form) {
//     const result: NewForm = {
//       type: form.type,
//       name: form.name,
//       phone: form.phone,
//       city: form.city,
//       passport: form.passport,
//     };

//     if (form.company && form.type === 'legal') {
//       result.companyInn = form.company.inn;
//       result.companyName = form.company.name;
//     }
//     await props.onSubmit(result);
//   });

//   const [type, company] = watch(['type', 'company']);

//   const onSelectCompany = (company: DataType) => {
//     setValue('company', company);
//   };

//   return (
//     <>
//       <div className="flex-1 overflow-y-auto rounded-3xl px-4 sm:px-6">
//         <div className="mb-4 text-base-lh-125 text-gray-400">
//           В&nbsp;случае неверного заполнения полей, повлекшего невозможность
//           сдачи груза, груз передается на&nbsp;платное хранение.
//         </div>
//         <form onSubmit={onSubmit} id="addressForm">
//           <Controller
//             name="city"
//             control={control}
//             rules={{
//               required: 'Укажите город доставки',
//             }}
//             render={({ field, fieldState }) => (
//               <InputWrapper
//                 required
//                 title="Город доставки"
//                 className="mb-3"
//                 error={fieldState.error?.message}
//               >
//                 <CitySelect
//                   {...field}
//                   placeholder="Например, Краснодар"
//                   error={errors.name && true}
//                   value={field.value}
//                 />
//               </InputWrapper>
//             )}
//           />
//           <Controller
//             control={control}
//             name="type"
//             render={({ field }) => (
//               <Switch.Group>
//                 <div className="mb-4 flex w-full cursor-pointer items-start">
//                   <Switch
//                     checked={field.value === 'legal'}
//                     onChange={(value: boolean) => {
//                       if (value) {
//                         field.onChange('legal');
//                       } else {
//                         field.onChange('individual');
//                       }
//                     }}
//                   >
//                     <div className="relative inline-flex h-5 w-9 flex-none items-center rounded-full border border-gray-300 transition-colors hover:border-gray-400 focus:outline-none ui-checked:border-green-500">
//                       <span className="inline-block h-4 w-4 translate-x-0.5 rounded-full bg-gray-300 transition-transform ui-checked:translate-x-4 ui-checked:bg-green-500" />
//                     </div>
//                   </Switch>
//                   <Switch.Label className="ml-4 text-base-lh-100 text-gray-800">
//                     Получатель Юридическое лицо или ИП
//                   </Switch.Label>
//                 </div>
//               </Switch.Group>
//             )}
//           />
//           {type === 'legal' && (
//             <>
//               <Controller
//                 name="company"
//                 control={control}
//                 rules={{
//                   required: 'Укажите ИНН организации или ИП',
//                 }}
//                 render={({ field, fieldState }) => {
//                   return (
//                     <InputWrapper
//                       required
//                       title="Название организации или ИП"
//                       error={fieldState.error?.message}
//                       className="mb-6 text-base-lh-100"
//                     >
//                       <InnInput
//                         {...field}
//                         value={company && `${company.name}, ИНН ${company.inn}`}
//                         placeholder="Введите название компании или ИНН"
//                         onSelectCompany={onSelectCompany}
//                       />
//                     </InputWrapper>
//                   );
//                 }}
//               />
//             </>
//           )}
//           <Controller
//             name="name"
//             control={control}
//             rules={{
//               required:
//                 type === 'individual'
//                   ? 'Укажите ФИО'
//                   : 'Укажите ФИО получателя',
//             }}
//             render={({ field, fieldState }) => (
//               <InputWrapper
//                 required
//                 title={type === 'individual' ? 'ФИО' : 'ФИО получателя'}
//                 className="mb-4 text-base-lh-100"
//                 error={fieldState.error?.message}
//               >
//                 <FioInput
//                   {...field}
//                   placeholder="Укажите ФИО, как в паспорте"
//                   error={errors.name && true}
//                   value={field.value}
//                 />
//                 {type === 'legal' && (
//                   <div className="mt-1 text-base-lh-125 text-gray-400">
//                     Будет использовано при оформлении доставки. Если будет
//                     получать сотрудник&nbsp;&mdash; не&nbsp;забудьте подготовить
//                     доверенность.
//                   </div>
//                 )}
//               </InputWrapper>
//             )}
//           />
//           {type === 'individual' && (
//             <Controller
//               name="passport"
//               control={control}
//               rules={{
//                 required: 'Укажите серию и номер паспорта',
//                 ...passportValidation,
//               }}
//               render={({ field, fieldState }) => (
//                 <InputWrapper
//                   required
//                   title="Серия, номер паспорта"
//                   className="mb-4 text-base-lh-100"
//                   error={fieldState.error?.message}
//                 >
//                   <PassportInput
//                     {...field}
//                     value={field.value}
//                     error={fieldState.error ? 'true' : undefined}
//                     disabled={isSubmitting}
//                   />
//                 </InputWrapper>
//               )}
//             />
//           )}
//           <Controller
//             name="phone"
//             control={control}
//             rules={{
//               required: 'Укажите номер телефона',
//               ...phoneValidation,
//             }}
//             render={({ field, fieldState }) => (
//               <InputWrapper
//                 required
//                 title="Номер телефона"
//                 error={fieldState.error?.message}
//                 className="mb-6 text-base-lh-100"
//               >
//                 <InputPhone
//                   {...field}
//                   error={fieldState.error ? 'true' : undefined}
//                   disabled={isSubmitting}
//                 />
//                 <div className="mt-1 text-base-lh-125 text-gray-400">
//                   По данному номеру ТК оповестит о прибытии заказа
//                 </div>
//               </InputWrapper>
//             )}
//           />
//         </form>
//       </div>
//       <div className="sticky bottom-0 bg-white px-6 py-4 shadow-md sm:rounded-b-3xl">
//         <div className="w-full">
//           <Button
//             form="addressForm"
//             as="button"
//             type="submit"
//             label={isSubmitting ? props.buttonTextSubmit : props.buttonText}
//             theme={'primary'}
//             icon={
//               isSubmitting ? <IconSpinner className="text-green-500" /> : null
//             }
//             size={'lg'}
//             loading={isSubmitting}
//             disabled={isSubmitting}
//           />
//         </div>
//       </div>
//     </>
//   );
// };
