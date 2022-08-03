import * as bcrypt from 'bcrypt';

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};


export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(png)$/)) {
    return callback(new Error('Only png files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = req.user.id;
  const fileExtName = file.originalname.split('.')[1];
  callback(null, `${name}.${fileExtName}`);
};
