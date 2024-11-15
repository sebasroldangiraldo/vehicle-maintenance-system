import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaCar } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";

export const icons = {
  logout : <FiLogOut size={20} />,
  back: <IoIosArrowBack size={20}/>,
  foward: <IoIosArrowForward size={20}/>,
  document: <IoDocumentTextOutline size={20} />,
  add: <IoAddCircleOutline size={20} />,
  close : <IoClose size={20} />,
  car : <FaCar size={35} />,
  smallCar : <FaCar size={20} />,
  lock : <FaLock size={15}  />,
  user: <FaUserCircle size={55} />,
  trash: <TbTrash size={20} />,
  edit: <FaRegEdit size={20}/>,
  history: <MdOutlineHistory size={20} />
};