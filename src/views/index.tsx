import Loadable from 'components/common/loadable';
import { GuestRoute, ShopRoute, StaffRoute } from 'components/common';
import { FC, lazy, useCallback } from 'react';
import { BrowserRouter, Route, Routes, useBeforeUnload } from 'react-router-dom';
import { AuthContext } from 'utils/context/auth';
import useAuth from 'hooks/fetch-hooks/use-auth';
import { request } from 'utils/config/axios';

// GUEST
const Landing = Loadable(lazy(() => import('views/guest/landing')));
const SignIn = Loadable(lazy(() => import('views/guest/sign-in')));
const SignUp = Loadable(lazy(() => import('views/guest/sign-up')));
const ForgotPassword = Loadable(lazy(() => import('views/guest/forgot-password')));
const ResetPassword = Loadable(lazy(() => import('views/guest/reset-password')));
const Test = Loadable(lazy(() => import('views/guest/test')));
const PrivacyPolicy = Loadable(lazy(() => import('views/common/privacy-policy')));
const TermsOfService = Loadable(lazy(() => import('views/common/terms-of-service')));
const Animations = Loadable(lazy(() => import('views/guest/animations')));
const ComingSoonFeatures = Loadable(lazy(() => import('views/guest/coming-soon-features')));
const ContactUs = Loadable(lazy(() => import('views/guest/contact-us')));
const FeatureRequest = Loadable(lazy(() => import('views/guest/request-feature')));
const BugReportPage = Loadable(lazy(() => import('views/guest/report-a-bug')));
// SHOP
const DashboardShop = Loadable(lazy(() => import('views/shop/dashboard')));
const Products = Loadable(lazy(() => import('views/shop/products')));
const Checkout = Loadable(lazy(() => import('views/shop/checkout')));
const UpVotes = Loadable(lazy(() => import('./shop/reddit/upvotes/index')));
const PostSchelduler = Loadable(lazy(() => import('views/shop/reddit/post-schelduler')));
const Wallet = Loadable(lazy(() => import('views/shop/wallet')));
const Settings = Loadable(lazy(() => import('views/shop/settings')));
// STAFF
const DashboardStaff = Loadable(lazy(() => import('views/staff/dashboard')));
const CreateGoogleAccount = Loadable(lazy(() => import('views/staff/account-google/create')));
const GoogleAccounts = Loadable(lazy(() => import('views/staff/account-google/all-accounts')));
const AddGoogleAccount = Loadable(lazy(() => import('views/staff/account-google/add-google-accounts')));
const CreateRedditAccount = Loadable(lazy(() => import('views/staff/accounts-reddit/create')));
const RedditAccounts = Loadable(lazy(() => import('views/staff/accounts-reddit/all-accounts')));
const ProxyPage = Loadable(lazy(() => import('views/staff/proxy/index')));
const SettingsAdmin = Loadable(lazy(() => import('views/staff/settings')));
const ChangeAdminPassword = Loadable(lazy(() => import('views/staff/change-password')));
const AllAdmins = Loadable(lazy(() => import('views/staff/staff-admins/all-admins')));
const ActiveBots = Loadable(lazy(() => import('views/staff/bots/active-bots')));
const CreateBot = Loadable(lazy(() => import('views/staff/bots/create-bot')));
const AllBlogs = Loadable(lazy(() => import('views/staff/blogs/all-blogs')));
const AddBlogs = Loadable(lazy(() => import('views/staff/blogs/add-blogs')));
const AddOutlookEmails = Loadable(lazy(() => import('views/staff/outlook-emails/add-emails')));
const AllOutlookEmails = Loadable(lazy(() => import('views/staff/outlook-emails/all-emails')));
const ConfigBotsTable = Loadable(lazy(() => import('views/staff/bots/config-bots')));
const ConfigBotsPage = Loadable(lazy(() => import('views/staff/bots/config-bots/ConfigPage')));
const CreatePackages = Loadable(lazy(() => import('views/staff/tokensPackages/index')));
const BrowserConfig = Loadable(lazy(() => import('views/staff/browser-config/index')));
const AllBots = Loadable(lazy(() => import('views/staff/bots/all-bots/index')));
const BotAllDetails = Loadable(lazy(() => import('views/staff/bots/bot-all-details')));
const AllServices = Loadable(lazy(() => import('views/staff/services/all-services')));
const AllFlows = Loadable(lazy(() => import('views/staff/flows/all-flows')));
const AllPartners = Loadable(lazy(() => import('views/staff/partners/all-partners')));
const Currency = Loadable(lazy(() => import('views/staff/currency/index')));
const Newsletter = Loadable(lazy(() => import('views/staff/newsletter/all-newsletters')));
const FAQPage = Loadable(lazy(() => import('views/staff/faq/index')));
const ReviewControlPage = Loadable(lazy(() => import('views/staff/reviews/index')));
const Unsubscribe = Loadable(lazy(() => import('views/guest/landing/unsubscribe')));
const Media = Loadable(lazy(() => import('views/staff/media/index')));
const StaffProducts = Loadable(lazy(() => import('views/staff/products')));

const Views: FC = () => {
	const auth = useAuth();
	const role = auth.user?.role;
	useBeforeUnload(
		useCallback(() => {
			role && request.post('auth/fake-logout');
		}, [role])
	);

	return (
		<AuthContext.Provider value={auth}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<GuestRoute role={role} />}>
						<Route path='/' element={<Landing />} />
						<Route path='/sign-in' element={<SignIn />} />
						<Route path='/sign-up' element={<SignUp />} />
						<Route path='/forgot-password' element={<ForgotPassword />} />
						<Route path='/reset-password' element={<ResetPassword />} />
						<Route path='/Test' element={<Test />} />
						<Route path='/privacy-policy' element={<PrivacyPolicy />} />
						<Route path='/terms-of-service' element={<TermsOfService />} />
						<Route path='/unsubscribe/:id' element={<Unsubscribe />} />
						<Route path='/animations' element={<Animations />} />
						<Route path='/coming-soon-features' element={<ComingSoonFeatures />} />
						<Route path='/contact' element={<ContactUs />} />
						<Route path='/request-feature' element={<FeatureRequest />} />
						<Route path='/report' element={<BugReportPage />} />
					</Route>
					<Route path='/shop' element={<ShopRoute role={role} />}>
						<Route path='/shop/dashboard' element={<DashboardShop />} />
						<Route path='/shop/products' element={<Products />} />
						<Route path='/shop/checkout' element={<Checkout />} />
						<Route path='/shop/wallet' element={<Wallet />} />
						<Route path='/shop/settings' element={<Settings />} />
						<Route path='/shop/post-schelduler' element={<PostSchelduler />} />
						<Route path='/shop/upvotes' element={<UpVotes />} />
						<Route path='/shop/anotherdummyroute' element={<Test />} />
					</Route>
					<Route path='/staff' element={<StaffRoute role={role} />}>
						<Route path='/staff/dashboard' element={<DashboardStaff />} />

						{/* ************************  | PROXY |  ************************** */}

						<Route path='/staff/proxies' element={<ProxyPage />} />

						{/* *************************  | ACCOUNTS |  ************************* */}

						<Route path='/staff/account-google-create' element={<CreateGoogleAccount />} />
						<Route path='/staff/account-google-add' element={<AddGoogleAccount />} />
						<Route path='/staff/accounts-google' element={<GoogleAccounts />} />
						<Route path='/staff/account-reddit-create' element={<CreateRedditAccount />} />
						<Route path='/staff/accounts-reddit' element={<RedditAccounts />} />

						{/* **************************  | SETTINGS |  ************************ */}

						<Route path='/staff/settings' element={<SettingsAdmin />} />
						<Route path='/staff/admin-password' element={<ChangeAdminPassword />} />

						{/* *************************  | MEMBERS |  ************************* */}

						<Route path='/staff/admins' element={<AllAdmins />} />

						{/* *************************  | BOTS |  ************************* */}

						<Route path='/staff/active-bots' element={<ActiveBots />} />
						<Route path='/staff/create-bot' element={<CreateBot />} />
						<Route path='/staff/all-bots' element={<AllBots />} />
						<Route path='/staff/bot-all-details/:id' element={<BotAllDetails />} />

						{/* *************************  | BLOGS |  ************************* */}

						<Route path='/staff/blogs' element={<AllBlogs />} />
						<Route path='/staff/add-blogs' element={<AddBlogs />} />

						{/* *************************  | OUTLOOK |  ************************* */}

						<Route path='/staff/outlook-emails' element={<AllOutlookEmails />} />
						<Route path='/staff/add-outlook-email' element={<AddOutlookEmails />} />

						{/* *************************  | CONFIG |  ************************* */}

						<Route path='/staff/config-bots' element={<ConfigBotsTable />} />
						<Route path='/staff/config-bots/:id' element={<ConfigBotsPage />} />

						{/* *************************  | PACKAGES |  ************************* */}

						<Route path='/staff/create-package' element={<CreatePackages />} />

						{/* *************************  | BROWSER CONFIGS |  ************************* */}

						<Route path='/staff/browser-configs' element={<BrowserConfig />} />

						{/* *************************  | SERVICES |  ************************* */}

						<Route path='/staff/services' element={<AllServices />} />

						{/* *************************  | FLOW |  ************************* */}

						<Route path='/staff/flows' element={<AllFlows />} />

						{/* *************************  | CURRENCY |  ************************* */}

						<Route path='/staff/currency' element={<Currency />} />

						{/* *************************  | NEWSLETTER |  ************************* */}

						<Route path='/staff/newsletter' element={<Newsletter />} />

						{/* *************************  | PARTNERS |  ************************* */}

						<Route path='/staff/partners' element={<AllPartners />} />

						{/* *************************  | PRODUCTS |  ************************* */}

						<Route path='/staff/products' element={<StaffProducts />} />

						{/* *************************  | FAQ |  ************************* */}

						<Route path='/staff/faq' element={<FAQPage />} />

						{/* *************************  | ReviewControlPage |  ************************* */}

						<Route path='/staff/review' element={<ReviewControlPage />} />

						{/* *************************  | Media |  ************************* */}

						<Route path='/staff/media' element={<Media />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthContext.Provider>
	);
};

export default Views;
