import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type TAppStackParamList = TAppRoutesStackParamList;

export type TAppRoutesStackParamList = ParamListBase & {
  Award: undefined;
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends TAppStackParamList {}
  }
}

export type AwardScreenProps = NativeStackScreenProps<
  TAppRoutesStackParamList,
  'Award'
>;
