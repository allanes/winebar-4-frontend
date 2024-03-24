import { Tapa, TapasService } from '../../codegen_output';

export const fetchTapaImageByProductId = async (productId: number): Promise<string | null> => {
    try {
      const response = await TapasService.handleGetFotoBackendApiV1TapasFotoIdGet(productId, true);
      if (response instanceof Blob) {
        return URL.createObjectURL(response);
      } else {
        console.error('Response is not a Blob:', response);
        return null;
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

export const fetchTapaImage = async (tapa: Tapa): Promise<string | null> => {
  if (!tapa.foto) {
    return null;
  }

  try {
    const response = await TapasService.handleGetFotoBackendApiV1TapasFotoIdGet(tapa.id, false);
    if (response instanceof Blob) {
      return URL.createObjectURL(response);
    } else {
      console.error('Response is not a Blob:', response);
      return null;
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};
