import { useContext, useState } from "react";

const CardsInputContext = React.createContext();

export const useCardsInput = () => {
  return useContext(CardsInputContext);
};

export const CardsInputProvider = ({ children }) => {
  const [cardsInput, setCardsInput] = useState(false);

  const toggleCardsInput = () => {
    setCardsInput(!cardsInput);
  };

  return (
    <CardsInputContext.Provider
      value={{
        visible: cardsInput,
        toggleCardsInput,
      }}
    >
      {children}
    </CardsInputContext.Provider>
  );
};
