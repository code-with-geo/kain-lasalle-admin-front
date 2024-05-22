import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Dashboard from "./pages/Dashboard";
import Store from "./pages/store/Store";
import AddStore from "./pages/store/AddStore";
import { StoreProvider } from "./context/Store";
import EditStore from "./pages/store/EditStore";
import Products from "./pages/products/Products";
import AddProducts from "./pages/products/AddProducts";
import { ProductProvider } from "./context/Product";
import EditProducts from "./pages/products/EditProducts";
import Vendors from "./pages/vendors/Vendors";
import { VendorProvider } from "./context/Vendor";
import AddVendor from "./pages/vendors/AddVendor";
import EditVendor from "./pages/vendors/EditVendor";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./context/Auth";
import Orders from "./pages/orders/Orders";
import { OrdersProvider } from "./context/Orders";

function App() {
	return (
		<div className='App'>
			<AuthProvider>
				<StoreProvider>
					<ProductProvider>
						<VendorProvider>
							<OrdersProvider>
								<Router>
									<Routes>
										<Route path='/login' element={<Login />} />

										<Route element={<ProtectedRoutes />}>
											<Route path='/' element={<Dashboard />}>
												<Route index element={<Store />} />
												<Route path='/store' element={<Store />} />
												<Route path='/store/add' element={<AddStore />} />
												<Route
													path='/store/edit/:storeID'
													element={<EditStore />}
												/>
												<Route
													path='/store/products/:storeID'
													element={<Products />}
												/>
												<Route
													path='/store/products/:storeID/add'
													element={<AddProducts />}
												/>
												<Route
													path='/store/products/:storeID/edit/:id'
													element={<EditProducts />}
												/>
												<Route
													path='/store/vendor/:storeID'
													element={<Vendors />}
												/>
												<Route
													path='/store/vendor/:storeID/add'
													element={<AddVendor />}
												/>
												<Route
													path='/store/vendor/:storeID/edit/:id'
													element={<EditVendor />}
												/>
												<Route path='/orders' element={<Orders />} />
											</Route>
										</Route>
									</Routes>
								</Router>
							</OrdersProvider>
						</VendorProvider>
					</ProductProvider>
				</StoreProvider>
			</AuthProvider>
		</div>
	);
}

export default App;
