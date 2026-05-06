import React, { useState ,useContext} from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid,mode) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [refreshOrders, setRefreshOrders] = useState(false);

  const triggerOrdersRefresh = () => {
    setRefreshOrders(prev => !prev);
  };
  const handleOpenBuyWindow = (uid,mode) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedMode(mode);
  };

  const handleCloseBuyWindow = (mode) => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setSelectedMode(mode);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        triggerOrdersRefresh, 
        refreshOrders,     
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} mode={selectedMode}/>}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
