import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Admin, ProductList, ProductDetail, Contact, ContactIn, ContactEu, ContactUs, PageNotFound } from "../pages";
import { NewGame } from "../pages/NewGame";
import { Game } from "../pages/Game";
import { Play } from "../pages/Play";
import { Questions } from "../pages/Questions";
import { Group2 } from "../pages/Group2";
import { Name } from "../pages/Name";
import { Join } from "../pages/Join";
import { GroupName } from "../pages/GroupName";

export const AllRoutes = () => {
  const user = true;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<ProductList />} />
        {/* <Route path="name" element={<EnterName />} /> */}
        <Route path="play" element={<Play />} />
        <Route path="questions" element={<Questions />} />
        <Route path="name" element={<Name />} />
        <Route path="join" element={<Join />} />
        <Route path="new" element={<NewGame />} />
        <Route path="group" element={<Group2 />} />
        <Route path="groupName" element={<GroupName />} />
        <Route path="game/:id" element={<Game />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="contact" element={<Contact />} >
          <Route path="in" element={<ContactIn />} />
          <Route path="eu" element={<ContactEu />} />
          <Route path="us" element={<ContactUs />} />
        </Route>
        <Route path="admin" element={user ? <Admin /> : <Navigate to="/" />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
