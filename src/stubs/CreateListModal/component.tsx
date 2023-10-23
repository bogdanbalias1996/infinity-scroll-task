import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {CreateListFormState} from './types';
import {useDispatch, useSelector} from 'react-redux';
import {listCreateRequest} from './actions';

const CreateListSchema = Yup.object().shape({
  name: Yup.string()
    .required('Should not be empty')
    .matches(
      /^[A-Za-z][A-Za-z0-9]*$/,
      'Should be combination of numbers & alphabets',
    )
    .max(255, 'Must be equal or less than 255 characters'),
  description: Yup.string()
    .required('Should not be empty')
    .max(1000, 'Must be equal or less than 1000 characters'),
});

const CreateListModal = () => {
  const dispatch = useDispatch();
  const listCreating = useSelector(state => state.create.listCreating);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit: (values: CreateListFormState) => {
      dispatch(listCreateRequest(values));
    },
    validationSchema: CreateListSchema,
    validateOnChange: false,
  });

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Name"
        testID="NameInput"
        error={Boolean(formik.errors.name)}
        value={formik.values.name}
        onChangeText={(value: string) => {
          formik.setFieldValue('name', value);
          formik.setFieldError('name', '');
        }}
      />
      <HelperText
        testID="NameError"
        type="error"
        visible={Boolean(formik.errors.name)}>
        {formik.errors.name}
      </HelperText>
      <TextInput
        mode="outlined"
        label="Description"
        testID="DescriptionInput"
        error={Boolean(formik.errors.description)}
        value={formik.values.description}
        onChangeText={(value: string) => {
          formik.setFieldValue('description', value);
          formik.setFieldError('description', '');
        }}
      />
      <HelperText type="error" visible={Boolean(formik.errors.description)}>
        {formik.errors.description}
      </HelperText>
      <Button
        onPress={formik.handleSubmit}
        testID="SubmitButton"
        mode="contained"
        loading={listCreating}>
        Create
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default CreateListModal;
