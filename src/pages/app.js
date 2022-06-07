import { Router } from "@reach/router"
import React from "react"
import "react-multi-carousel/lib/styles.css"
import Layout from "../components/Layout"
import "antd/dist/antd.css"
import "font-awesome/css/font-awesome.min.css"
import Dashboard from "./dashboard/dashboard"
import ClaimDetail from "./dashboard/claimDetail"
import DashboardListView from "../components/Dashboard/DashboardListView";
import Signin from '../pages/signin/signin'
import Contact from "../pages/contact/contact"
import Dashboardlist from '../pages/dashboard/dashboardlist'
import Detail from '../pages/dashboard/detail'
import Agent from '../pages/agents/agents'
import Findagentseller from '../pages/seller/findagentseller'
import Sellerhome from '../pages/seller/sellerhome'
import ProfileOverview from '../pages/seller/ProfileOverview'
import OwnedProperties from '../pages/seller/ownedProperties'
import IntrestedProperty from '../pages/seller/intrestedProperty'
import Tours from '../pages/seller/tours'
import MyAgent from '../pages/seller/myAgent'
import Listproperty from '../pages/seller/listproperty'
import Agentsignup from '../pages/agents/agentsignup'
import AgentEditProfile from '../pages/agents/AgentEditProfile'
import Forgetpassword from '../pages/forgetpassword/forgetpassword'
import Signup from '../pages/signup/signup'
import Network from '../pages/network/network'
import Messages from "../pages/messages"
import Notifications from '../pages/notifications'
import Sellers from '../pages/sellers/sellers'
import Buyers from '../pages/buyers'
import NetworkDetail from "../pages/network/networkDetail"
import SellerEditinfo from '../pages/seller/sellerEditinfo'
import Estimator from '../pages/seller/estimator'
import Termscondition from '../pages/termscondition/termscondition'
import Privacypolicy from '../pages/privacypolicy/privacypolicy'
import PrivateRoute from "../components/PrivateRoute"
import ToursAgent from '../pages/toursAgent'
import Findagent from '../pages/findagent'
import Termsofuse from '../pages/termsconditionmobile/termsconditionmobile'
import Privacy from '../pages/privacypolicymobile/privacypolicymobile'
import ReferralFee from "./referralFee/referralFee"
import HomePage from "./Homepage/homePage"




const App = () => (
  <>
    <Router>
      {/* dynamic routes here */}
      <PrivateRoute path="/ownedproperties" component={OwnedProperties} />
      <PrivateRoute path="/findagentseller" component={Findagentseller} />
      <PrivateRoute path="/sellmyhome" component={Sellerhome} />
      <PrivateRoute path="/ProfileOverview" component={ProfileOverview} />
      <PrivateRoute path="/tours" component={Tours} />
      <PrivateRoute path="/intrestedproperty" component={IntrestedProperty} />
      <PrivateRoute path="/listproperty" component={Listproperty} />
      <PrivateRoute path="/myAgent" component={MyAgent} />
      <PrivateRoute path="/viewprofile" component={AgentEditProfile} />
      <PrivateRoute path="/network" component={Network} />
      <PrivateRoute path="/messages" component={Messages} />
      <PrivateRoute path="/notifications" component={Notifications} />
      <PrivateRoute path="/sellers" component={Sellers} />
      <PrivateRoute path="/buyers" component={Buyers} />
      <PrivateRoute path="/network/detail" component={NetworkDetail} />
      <PrivateRoute path="/seller/Editinfo" component={SellerEditinfo} />
      <PrivateRoute path="/estimator" component={Estimator} />
      <PrivateRoute path="/agenttour" component={ToursAgent} />
      <PrivateRoute path="/findagent" component={Findagent} />
      <PrivateRoute path="/referralFee" component={ReferralFee} />


      {/* <HomePage exact path="/" /> */}
      <Dashboard exact path="/" />
      <ClaimDetail path="/dashboard/detail/:id" /> 
      <Signin path="/signin" />   
      <Contact path="/contact" />
      <Dashboardlist path="/dashboard" />
      <Detail path= "/dashboard/detail" />
      <Agent path="/agents" />     
      <Agentsignup path="/agentsignup" />
      <Forgetpassword path="/forgetpassword" />
      <Signup path="/signup" />
      <Termscondition path="/termscondition" />
      <Privacypolicy path='/privacypolicy' />
      <Termsofuse path='/termsofuse'/>
      <Privacy path='/privacy'/>
    
    </Router>
  </>
)

export default App