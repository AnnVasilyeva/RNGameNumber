// import React from 'react';
// import { useDropzone } from 'react-dropzone';
// import { IconImagePlus } from './icons/IconImagePlus';
// import classNames from 'classnames';
// import { UploadedFileV2 } from '../../consts/db-values';
// import { getFileV2ApiUrl } from '../utils/common.utils';
// import Gallery from './Gallery';

// export type MediaInputValue =
//   | {
//       type: 'new';
//       file: File;
//     }
//   | {
//       type: 'exist';
//       file: UploadedFileV2;
//     };
// export type MediaInputNewType = {
//   type: 'new';
//   file: File;
// };

// type MediaInputProps = {
//   name?: string;
//   onBlur?: React.FocusEventHandler<HTMLInputElement>;
//   value?: MediaInputValue[];
//   onChange: (event: { target: { value: MediaInputValue[] } }) => void;
//   multiple?: boolean;
//   error?: string;
// };

// export const MediaInput = React.forwardRef<never, MediaInputProps>(
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   (props, _) => {
//     const handleChange = React.useCallback(
//       function (value: MediaInputValue[]) {
//         props.onChange({ target: { value: value } });
//       },
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       [props.onChange],
//     );

//     const removeFile = React.useCallback(
//       function (index: number) {
//         const newValue = Array.from(props.value || []);
//         newValue.splice(index, 1);

//         handleChange(newValue);
//       },
//       [handleChange, props.value],
//     );

//     function sizeValidator(value: File) {
//       if (value.size > 10000000) {
//         return {
//           code: 'size-too-large',
//           message:
//             'Файл квитанции должен быть в формате PDF, PNG или JPG и весом не более 10 MB',
//         };
//       }
//       return null;
//     }

//     const {
//       getRootProps,
//       getInputProps,
//       open,
//       isDragReject,
//       fileRejections,
//       rootRef,
//     } = useDropzone({
//       noClick: true,
//       noKeyboard: true,
//       accept: {
//         'image/jpeg': [],
//         'image/png': [],
//         'application/pdf': [],
//       },
//       validator: sizeValidator,
//       onDrop: async (acceptedFiles) => {
//         const fileList = acceptedFiles.map((file) => ({
//           type: 'new' as const,
//           file,
//         }));
//         handleChange(
//           props.multiple ? [...(props.value || []), ...fileList] : fileList,
//         );
//       },
//     });

//     React.useEffect(() => {
//       if (props.error && rootRef.current) {
//         rootRef.current.scrollIntoView({ behavior: 'smooth' });
//       }
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [props.error, rootRef.current]);

//     const imagesList = React.useMemo(
//       () =>
//         props.value?.map((data) => {
//           const original =
//             data.type === 'new'
//               ? URL.createObjectURL(data.file)
//               : getFileV2ApiUrl(data.file.id);
//           let type: 'pdf' | 'image' | 'video' | 'unknown';

//           if (
//             data.file.type.startsWith('image/') ||
//             data.file.type === 'image'
//           ) {
//             type = 'image';
//           } else if (
//             data.file.type === 'application/pdf' ||
//             data.file.type === 'pdf'
//           ) {
//             type = 'pdf';
//           } else {
//             type = 'unknown';
//           }

//           return {
//             type,
//             id: original,
//             size: data.file.size,
//           };
//         }),
//       [props.value],
//     );

//     return (
//       <>
//         {(props.multiple ||
//           !Array.isArray(props.value) ||
//           props.value.length === 0) && (
//           <div
//             className={classNames(
//               props.error ? 'border-red-500' : 'border-gray-300',
//               'group box-border w-full cursor-pointer rounded-md border border-dashed px-5 pb-4 pt-3 hover:border-green-400',
//             )}
//           >
//             <label
//               {...getRootProps({ className: 'dropzone' })}
//               className="flex flex-col items-center justify-center"
//             >
//               <input
//                 {...getInputProps({
//                   name: props.name,
//                   multiple: props.multiple,
//                 })}
//               />
//               <IconImagePlus className="mb-1 h-6 w-6 text-gray-400" />
//               <button
//                 type="button"
//                 onClick={open}
//                 className="mb-2 rounded-md bg-gray-100 px-2 py-1 text-sm-lh-125 text-gray-800 group-hover:bg-green-400 group-hover:text-white"
//               >
//                 Выберите файл
//               </button>
//               <p className="mb-1 text-sm-lh-100 text-gray-400">
//                 или перетащите в область загрузки
//               </p>
//               <p className="text-sm-lh-100 text-gray-400">
//                 PDF, PNG, JPG до 10MB
//               </p>
//             </label>
//           </div>
//         )}
//         {(isDragReject || fileRejections.length > 0) && !props.error && (
//           <div className="text-red-500">
//             Файл квитанции должен быть в формате PDF, PNG или JPG и весом не
//             более 10 MB
//           </div>
//         )}
//         {imagesList && imagesList.length > 0 && !props.error && (
//           <div className="mt-4 flex w-full flex-wrap items-center">
//             <Gallery
//               images={imagesList}
//               className={'relative mb-2 mr-4 h-20 w-20 bg-gray-100 last:mr-0'}
//               onDelete={removeFile}
//             />
//           </div>
//         )}
//       </>
//     );
//   },
// );

// MediaInput.displayName = 'MediaInput';
