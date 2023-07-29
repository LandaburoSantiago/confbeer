import { getDocs } from "firebase/firestore";
import { conferencesDocument } from "../../db";

export const useConferences = () => {
  const getAllConferences = async () => {
    try {
      const { docs } = await getDocs(conferencesDocument);
      return docs;
    } catch (error) {
      console.error(`Error message: ${error}`);
      Alert.alert(
        "Algo salió mal",
        "Ocurrió un error al obtener las conferencias. Intente mas tarde",
        [{ text: "OK" }]
      );
    }
  };

  return {
    getAllConferences,
  };
};
