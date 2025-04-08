import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Homepage from "./components/Homepage.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { setSocket } from "./redux/socketSlice.js";
import { setOnlineUsers } from "./redux/userSlice.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  // console.log(authUser);
  const dispatch = useDispatch();

  // const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:8000", {
        transports: ["websocket"],
        query: {
          userId: authUser._id,
        },
      });

      newSocket.on("connect", () => {
        console.log("Connected to socket server:", newSocket.id);
      });
      // setSocket(newSocket);
      dispatch(setSocket(newSocket));

      newSocket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [authUser, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
