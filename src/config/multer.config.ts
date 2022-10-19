import { diskStorage } from 'multer';
import { editFileName, fileFilter } from '../shared/utils';

const MulterConfig = () => ({
  storage: diskStorage({
    destination: './uploads',
    filename: editFileName,
  }),
  fileFilter: fileFilter,
});
export default MulterConfig;
