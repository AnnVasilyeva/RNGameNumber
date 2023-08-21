// import React, { ReactElement, useEffect } from 'react';
// import Head from 'next/head';
// import Layout from '../components/Layout';
// import type { NextPageWithLayout } from './_app';
// import { BuyoutsOverview } from '../components/BuyoutsOverview/BuyoutsOverview';
// import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
// import { DeliveryOverview } from '../components/DeliveryOverview';
// import { withAuth } from '../lib/with-auth';
// import { setUserID } from '../services/metrika';
// import { setBitrixLiveChatUser } from '../services/bitrix-live-chat';
// import { ParcelModal } from '../components/ParcelModal';
// import { StoriesBlock } from '../components/StoriesBlock';
// import { useRouter } from 'next/router';
// import OrdersModal from '../components/OrdersModal';
// import { createModal } from '../services/modal.service';
// import qs from 'qs';
// import { getOrdersFromParams } from '../utils/common.utils';
// import OrdersListModal from '../components/OrdersListModal';
// import DeliverOrdersListModal from '../components/DeliverOrdersListModal';
// import SearchBlock from '../components/SearchBlock';
// import { IconChart } from '../components/icons/IconChart';
// import ReportModal from '../components/ReportModal';

// type HomeProps = {
//   user: {
//     userName: string;
//     userId: string;
//     avatar?: string;
//   };
// };

// export const getServerSideProps: GetServerSideProps<HomeProps> = withAuth();

// const Home: NextPageWithLayout<
//   InferGetServerSidePropsType<typeof getServerSideProps>
// > = (props) => {
//   useEffect(() => {
//     setUserID(props.user.userId);
//     setBitrixLiveChatUser(props.user);
//   }, [props.user]);

//   const router = useRouter();
//   const hash = router.asPath.split('#')[1] || '';
//   const [hashName = '', hashRawParams = ''] = hash.split('?');
//   const hashParams = React.useMemo(() => {
//     return qs.parse(hashRawParams, {
//       ignoreQueryPrefix: true,
//     }) as Record<string, unknown>;
//   }, [hashRawParams]);

//   React.useLayoutEffect(() => {
//     switch (hashName) {
//       case 'waiting-for-payment':
//         const selectedOrders: string[] = getOrdersFromParams(hashParams);

//         createModal({
//           component: OrdersModal,
//           theme: 'content',
//           title: 'Ожидают оплаты',
//           onClose: () => {
//             router.push(router.asPath.split('#')[0]);
//           },
//           props: {
//             defaultValue: selectedOrders,
//           },
//         });
//         break;
//       case 'in-work':
//         createModal({
//           component: OrdersListModal,
//           theme: 'content',
//           title: 'Выкупаем',
//           onClose: () => {
//             router.push(router.asPath.split('#')[0]);
//           },
//           props: {
//             status: 'inWork',
//           },
//         });
//         break;
//       case 'on-the-way':
//         createModal({
//           component: OrdersListModal,
//           theme: 'content',
//           title: 'Ожидаем получения',
//           onClose: () => {
//             router.push(router.asPath.split('#')[0]);
//           },
//           props: {
//             status: 'onTheWayToStock',
//           },
//         });
//         break;
//       case 'received-in-stock':
//         createModal({
//           component: OrdersListModal,
//           theme: 'content',
//           title: 'Готовы к отправке в Россию',
//           onClose: () => {
//             router.push(router.asPath.split('#')[0]);
//           },
//           props: {
//             status: 'receivedInStock',
//           },
//         });
//         break;
//       case 'assembly':
//         createModal({
//           component: DeliverOrdersListModal,
//           theme: 'content',
//           title: 'На сборке и упаковке',
//           onClose: () => {
//             router.push(router.asPath.split('#')[0]);
//           },
//           props: {
//             status: 'assembly',
//           },
//         });
//         break;
//       case 'received-in-russia':
//         createModal({
//           component: DeliverOrdersListModal,
//           theme: 'content',
//           title: 'Ожидают отправки по России',
//           onClose: () => {
//             router.push(router.asPath.split('#')[0]);
//           },
//           props: {
//             status: 'receivedInRussia',
//           },
//         });
//         break;
//       case 'sent-to-russia':
//         createModal({
//           component: DeliverOrdersListModal,
//           theme: 'content',
//           title: 'В пути на склад в России',
//           onClose: () => {
//             router.push(router.asPath.split('#')[0]);
//           },
//           props: {
//             status: 'sentToRussia',
//           },
//         });
//         break;
//     }
//   }, [hashName, hashParams, router]);

//   const [showModal, setShowModal] = React.useState(false);

//   const showParcelModal = () => {
//     setShowModal(true);
//   };

//   const closeParcelModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div>
//       <Head>
//         <title>Express Today</title>
//       </Head>
//       <StoriesBlock />
//       <div className="mb-4 flex items-center justify-between pl-4 lg:mb-6 lg:pl-6">
//         <h1 className="text-2xl font-semibold text-gray-800">Мои товары</h1>
//         <button
//           type="button"
//           className="flex flex-none items-center justify-between rounded-xl bg-white px-3 py-2"
//           onClick={() => {
//             createModal({
//               component: ReportModal,
//               theme: 'content',
//               title: 'Отчет по закупкам',
//             });
//           }}
//         >
//           <div className="hidden text-sm-lh-125 text-gray-800 sm:mr-3 sm:block">
//             Отчет по закупкам
//           </div>
//           <IconChart className="h-4 w-4 text-gray-800" />
//         </button>
//       </div>
//       <SearchBlock />
//       <BuyoutsOverview actionModal={showParcelModal} />
//       <DeliveryOverview />
//       <ParcelModal showModal={showModal} closeModal={closeParcelModal} />
//     </div>
//   );
// };

// Home.getLayout = function getLayout(page: ReactElement, pageProps) {
//   return <Layout user={pageProps.user}>{page}</Layout>;
// };

// export default Home;