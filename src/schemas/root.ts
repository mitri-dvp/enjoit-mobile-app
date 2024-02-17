import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const TermsSchema = zodResolver(
  z.object({
    acceptedTerms: z.boolean(),
    acceptedDataTreatment: z.boolean(),
  })
);

type TermsValuesType = {
  acceptedTerms: boolean;
  acceptedDataTreatment: boolean;
};

export const TermsValues: TermsValuesType = {
  acceptedTerms: false,
  acceptedDataTreatment: false,
};
