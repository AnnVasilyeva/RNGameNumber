// import {
//     Control,
//     Controller,
//     FieldPath,
//     FieldPathValue,
//     FieldValues,
//     UseFormRegister,
//   } from 'react-hook-form';
//   import React from 'react';
//   import { InputWrapper } from './InputWrapper';
//   import { IconTrash } from './icons/IconTrash';
//   import classNames from 'classnames';
//   import { decimalValidation, intValidation } from '../utils/validation';
//   import { MediaInput, MediaInputValue } from './MediaInput';
  
//   type ParcelItemValue = {
//     name?: string;
//     trackNumber: string;
//     requestCount: string;
//     productPrice: string;
//     comment: string;
//     requestFiles: MediaInputValue[];
//   };
  
//   type ParcelItemFormProps<
//     TFieldValues extends FieldValues,
//     TContext = unknown,
//   > = {
//     register: UseFormRegister<TFieldValues>;
//     control: Control<TFieldValues, TContext>;
//     onRemove?: () => void;
//     number: number;
//     path: keyof {
//       [P in FieldPath<TFieldValues> as FieldPathValue<
//         TFieldValues,
//         P
//       > extends ParcelItemValue
//         ? P
//         : string]: P;
//     };
//   };
  
//   const ParcelItemForm = <TFieldValues extends FieldValues, TContext = unknown>(
//     props: ParcelItemFormProps<TFieldValues, TContext>,
//   ) => {
//     const { control, register, onRemove, number, path } = props;
  
//     return (
//       <div className="mb-4 rounded-3xl bg-white px-4 py-6 shadow-md md:mb-6 md:px-6">
//         <div className="flex items-center justify-between">
//           <div className="mb-4 text-lg-lh-100 font-semibold">
//             Посылка №{number + 1}
//           </div>
//           {onRemove && (
//             <button
//               type="button"
//               className="h-6 w-6 outline-none"
//               onClick={() => {
//                 onRemove();
//               }}
//             >
//               <IconTrash className="h-6 w-6 text-gray-400" />
//             </button>
//           )}
//         </div>
//         <InputWrapper title="Название товара" className="mb-4 text-base-lh-100">
//           <input
//             inputMode="text"
//             autoComplete="off"
//             type="text"
//             placeholder="Например, чехлы для телефонов"
//             className={classNames(
//               'border-gray-300',
//               'block w-full rounded border p-3 text-left text-base-lh-125 text-gray-800 outline-none',
//             )}
//             {...register(`${String(path)}.name` as FieldPath<TFieldValues>)}
//           />
//           <div className="mt-1 text-sm-lh-100 text-gray-400">
//             По названию товара будет легко узнать заказ
//           </div>
//         </InputWrapper>
//         <Controller
//           control={control}
//           rules={{
//             required: 'Укажите трек-номер для отслеживания посылки',
//           }}
//           name={`${String(path)}.trackNumber` as FieldPath<TFieldValues>}
//           render={({ field, fieldState }) => (
//             <InputWrapper
//               required
//               error={fieldState.error?.message}
//               title="Трек-номер"
//               className="mb-4 text-base-lh-100"
//             >
//               <input
//                 {...field}
//                 type="text"
//                 inputMode="text"
//                 autoComplete="off"
//                 className={classNames(
//                   fieldState.error ? 'border-red-500' : 'border-gray-300',
//                   'block w-full rounded border p-3 text-left text-base-lh-125 text-gray-800 outline-none',
//                 )}
//               />
//               <div className="mb-2 mt-1 text-sm-lh-100 text-gray-400">
//                 Для отслеживания заказа и его идентификации
//               </div>
//             </InputWrapper>
//           )}
//         />
//         <Controller
//           control={control}
//           rules={{
//             required: 'Укажите заказанное количество товаров',
//             ...intValidation,
//           }}
//           name={`${String(path)}.requestCount` as FieldPath<TFieldValues>}
//           render={({ field, fieldState }) => (
//             <InputWrapper
//               title="Количество товаров"
//               className="mb-4 text-base-lh-100"
//               error={fieldState.error?.message}
//               required
//             >
//               <div className="relative mb-2 rounded">
//                 <input
//                   {...field}
//                   type="text"
//                   inputMode="numeric"
//                   autoComplete="off"
//                   className={classNames(
//                     fieldState.error ? 'border-red-500' : 'border-gray-300',
//                     'block w-full rounded border py-3 pr-9 text-left text-base-lh-125 text-gray-800',
//                   )}
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center py-3 pr-3">
//                   <span className="text-base-lh-125 text-gray-400">шт</span>
//                 </div>
//               </div>
//             </InputWrapper>
//           )}
//         />
//         <Controller
//           control={control}
//           rules={{
//             required: 'Укажите общую стоимость товаров в посылке',
//             ...decimalValidation,
//           }}
//           name={`${String(path)}.productPrice` as FieldPath<TFieldValues>}
//           render={({ field, fieldState }) => (
//             <InputWrapper
//               required
//               error={fieldState.error?.message}
//               title="Стоимость товаров"
//               className="mb-4 text-base-lh-100"
//             >
//               <div className="relative mb-2 rounded">
//                 <input
//                   {...field}
//                   className={classNames(
//                     fieldState.error ? 'border-red-500' : 'border-gray-300',
//                     'block w-full rounded border py-3 pr-7 text-left text-base-lh-125 text-gray-800 ',
//                   )}
//                   aria-describedby="price-currency"
//                   inputMode="decimal"
//                   autoComplete="off"
//                   placeholder="0"
//                   type="text"
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center py-3 pr-3">
//                   <span className="text-base-lh-125 text-gray-400">¥</span>
//                 </div>
//               </div>
//             </InputWrapper>
//           )}
//         />
//         <Controller
//           control={control}
//           rules={{
//             required: 'Загрузите хотя бы одну фотографию заказанного товара',
//             validate: (value) =>
//               value[0].file.size < 10000000 ||
//               'Файл квитанции должен быть в формате PDF, PNG или JPG и весом не более 10 MB',
//           }}
//           name={`${String(path)}.requestFiles` as FieldPath<TFieldValues>}
//           render={({ field, fieldState }) => (
//             <InputWrapper
//               required
//               error={fieldState.error?.message}
//               title="Фотографии товаров"
//               className="mb-4 text-base-lh-100"
//             >
//               <MediaInput {...field} error={fieldState.error?.message} multiple />
//               <div className="mb-2 mt-1 text-sm-lh-100 text-gray-400">
//                 Фотографии помогут нам понять, что пришло именно&nbsp;то, что
//                 вы&nbsp;заказывали.
//               </div>
//             </InputWrapper>
//           )}
//         />
//         <InputWrapper title="Комментарий к заказу" className="text-base-lh-100">
//           <textarea
//             inputMode="text"
//             autoComplete="off"
//             placeholder="Укажите здесь дополнительную информацию по заказу"
//             className="w-full rounded border border-gray-300 p-3 text-left text-base-lh-125 text-gray-800 outline-none placeholder:text-gray-400"
//             {...register(`${String(path)}.comment` as FieldPath<TFieldValues>)}
//           />
//         </InputWrapper>
//       </div>
//     );
//   };
  
//   export default ParcelItemForm;
  