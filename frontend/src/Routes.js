import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { useSelector } from "react-redux";

// Header and Footer RoutesImports
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Product Routes Imports
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

// Auth or User Routes Imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Cart Routes Imports
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

// Order Routes Imports
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

// Admin Routes Imports
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import OrdersList from "./components/admin/OrdersList";
import ProductReviews from "./components/admin/ProductReviews";

// Protected Route
import ProtectedRoute from "./components/route/ProtectedRoute";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Routes = ({ stripeApiKey }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(stripeApiKey);
  return (
    <Router>
      <div>
        <Header />
        <div className="container container-fluid">
          <Route path="/" exact component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" exact component={ProductDetails} />

          <Route path="/cart" exact component={Cart} />
          <ProtectedRoute path="/shipping" exact component={Shipping} />
          <ProtectedRoute path="/confirm" exact component={ConfirmOrder} />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" exact component={Payment} />
            </Elements>
          )}
          <ProtectedRoute path="/success" exact component={OrderSuccess} />

          <ProtectedRoute path="/orders/me" exact component={ListOrders} />
          <ProtectedRoute path="/order/:id" exact component={OrderDetails} />

          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/password/forgot" exact component={ForgotPassword} />
          <Route path="/password/reset/:token" exact component={NewPassword} />

          <ProtectedRoute path="/me" exact component={Profile} />
          <ProtectedRoute path="/me/update" exact component={UpdateProfile} />
          <ProtectedRoute
            path="/password/update"
            exact
            component={UpdatePassword}
          />
        </div>

        <ProtectedRoute
          path="/dashboard"
          isAdmin={true}
          exact
          component={Dashboard}
        />
        <ProtectedRoute
          path="/admin/products"
          isAdmin={true}
          exact
          component={ProductsList}
        />
        <ProtectedRoute
          path="/admin/product"
          isAdmin={true}
          exact
          component={NewProduct}
        />
        <ProtectedRoute
          path="/admin/product/:id"
          isAdmin={true}
          exact
          component={UpdateProduct}
        />
        <ProtectedRoute
          path="/admin/orders"
          isAdmin={true}
          exact
          component={OrdersList}
        />
        <ProtectedRoute
          path="/admin/order/:id"
          isAdmin={true}
          exact
          component={ProcessOrder}
        />
        <ProtectedRoute
          path="/admin/users"
          isAdmin={true}
          exact
          component={UsersList}
        />
        <ProtectedRoute
          path="/admin/user/:id"
          isAdmin={true}
          exact
          component={UpdateUser}
        />
        <ProtectedRoute
          path="/admin/reviews"
          isAdmin={true}
          exact
          component={ProductReviews}
        />

        {!loading && (!isAuthenticated || (user && user.role !== "admin")) && (
          <Footer />
        )}
      </div>
    </Router>
  );
};

export default Routes;
