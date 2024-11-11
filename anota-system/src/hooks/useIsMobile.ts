import { useMediaQuery } from "react-responsive";

const sm = "(max-width: 768px)";

const useIsMobile = () => {
  return useMediaQuery({ query: sm });
};

export default useIsMobile;
