import Wrapper from "../../assets/wrappers/SharedLayout"
import { BigSidebar, Navbar, SmallSidebar } from "../../components";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function SharedLayout() {
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()
  // useEffect(() => {
  //   if(!user)navigate("/register")
  // },[user,navigate])
  return (
    <>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
}
