import { Box } from "@mui/material";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />
      <Box display="flex" flex={1}>
        <Sidebar />
        <Box flex={1} p={3} bgcolor="#f5f5f5">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default ProtectedLayout;
