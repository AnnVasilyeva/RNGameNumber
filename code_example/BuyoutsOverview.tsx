// import React from 'react';
// import { CardButton } from '../CardButton';
// import { IconPlusCircleSolid } from '../icons/IconPlusCircleSolid';
// import { OrdersCard } from '../OrdersCard';
// import classNames from 'classnames';
// import { EmptyState } from '../EmptyState';
// import { SendRfButton } from '../SendRfButton';
// import parcel from './parcel.png';
// import plural from 'plural-ru';
// import { CardsLoader } from '../Loader';
// import Link from 'next/link';
// import { usePurchases } from '../../api/purchase-orders';

// type BuyoutsOverviewProps = {
//   actionModal: () => void;
// };

// type OrdersCardProps = {
//   path: string;
//   count: number;
//   label: string;
//   cta?: string;
//   status?: string;
// };

// export const BuyoutsOverview: React.FC<BuyoutsOverviewProps> = ({
//   actionModal,
// }) => {
//   const { data: purchaseOrders, isLoading } = usePurchases();

//   const count = React.useMemo(() => {
//     if (!Array.isArray(purchaseOrders)) {
//       return {
//         waitingForPayment: 0,
//         inWork: 0,
//         onTheWayToStock: 0,
//         receivedInStock: 0,
//       };
//     }

//     return purchaseOrders.reduce<{
//       waitingForPayment: number;
//       inWork: number;
//       onTheWayToStock: number;
//       receivedInStock: number;
//     }>(
//       (result, item) => {
//         if (item.status !== 'sentToRussia' && item.status !== 'canceled') {
//           result[item.status]++;
//         }
//         return result;
//       },
//       {
//         inWork: 0,
//         onTheWayToStock: 0,
//         receivedInStock: 0,
//         waitingForPayment: 0,
//       },
//     );
//   }, [purchaseOrders]);

//   const sendCount = count.receivedInStock;
//   const sendTitle = React.useMemo(() => {
//     const ready = plural(
//       sendCount,
//       'товар готов',
//       'товара готовы',
//       'товаров готовы',
//     );
//     return (
//       <>
//         {sendCount}&nbsp;{ready} к&nbsp;отправке в&nbsp;Россию
//       </>
//     );
//   }, [sendCount]);

//   const orders = (
//     ['waitingForPayment', 'inWork', 'onTheWayToStock'] as const
//   ).reduce<OrdersCardProps[]>((result, key) => {
//     const value = count[key];
//     if (!value) return result;
//     switch (key) {
//       case 'waitingForPayment':
//         result.push({
//           label: 'ожидают оплаты',
//           path: '#waiting-for-payment',
//           cta: 'Посмотреть все',
//           count: value,
//           status: 'waitingForPayment',
//         });
//         break;
//       case 'inWork':
//         result.push({
//           label: 'выкупаем',
//           path: '#in-work',
//           count: value,
//           status: 'inWork',
//         });
//         break;
//       case 'onTheWayToStock':
//         result.push({
//           label: 'ожидаем получения',
//           path: '#on-the-way',
//           count: value,
//           status: 'onTheWayToStock',
//         });
//         break;
//     }
//     return result;
//   }, []);

//   return (
//     <div>
//       {isLoading ? (
//         <CardsLoader actionModal={actionModal} />
//       ) : (
//         <>
//           <div className="mb-4 grid auto-rows-[theme(spacing.36)] grid-cols-4 gap-4 lg:mb-6 lg:grid-cols-12 lg:gap-x-5 lg:gap-y-6 2xl:grid-cols-8">
//             <div className="col-span-2 sm:col-span-1 lg:col-span-3 2xl:col-span-2">
//               <CardButton
//                 label="Создать заказ"
//                 description="на&nbsp;выкуп, поиск или производство товара"
//                 icon={<IconPlusCircleSolid />}
//                 actionModal={actionModal}
//               />
//             </div>
//             {orders.length > 0 ? (
//               orders.map((order) => {
//                 if (order) {
//                   return (
//                     <div
//                       className={classNames(
//                         orders.length < 3 ? '2xl:col-span-3' : '2xl:col-span-2',
//                         'col-span-2 sm:col-span-1 lg:col-span-3',
//                       )}
//                       key={order.path}
//                     >
//                       <OrdersCard
//                         as={Link}
//                         href={order.path}
//                         label={order.label}
//                         count={order.count}
//                         cta={order.cta}
//                       />
//                     </div>
//                   );
//                 }
//               })
//             ) : (
//               <div className="col-span-4 mb-4 lg:col-span-6 lg:mb-6">
//                 <EmptyState text="Когда вы&nbsp;создадите свой первый заказ, здесь появится информация о&nbsp;его статусе" />
//               </div>
//             )}
//           </div>
//           {sendCount > 0 && (
//             <div className="mb-4 py-2 lg:mb-6 lg:py-4">
//               <SendRfButton
//                 image={parcel}
//                 title={sendTitle}
//                 path="#received-in-stock"
//                 description={
//                   sendCount > 1 ? (
//                     <>Объедините их&nbsp;в&nbsp;общую доставку</>
//                   ) : (
//                     'Оформите доставку удобным для вас способом'
//                   )
//                 }
//               />
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };
