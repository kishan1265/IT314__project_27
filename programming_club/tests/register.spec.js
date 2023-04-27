function isFormValid(Data){
    const { name, email, programe, batch, password, password2} = Data;
    if(
        !name ||
        !email ||
        !password ||
        !password2 ||
        programe == '0' ||
        batch == '0'
    ) {
        return false;
    }

    return true;
}

describe('Register form validation', () => {
    test('returns true if all fields are filled', () => {
      // Mock form data
      const formData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        password2: 'password123',
        batch: '1',
        programe: '1',
      };
  
      expect(isFormValid(formData)).toBe(true);
    });
  
    test('returns false if any field is empty', () => {
      // Mock form data
      const formData = {
        name: 'John Doe',
        email: '',
        password1: 'password123',
        password2: 'password123',
        batch: '1',
        programe: '1',
      };
  
      expect(isFormValid(formData)).toBe(false);
    });
  });
  