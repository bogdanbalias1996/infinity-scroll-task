import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {CreateListFormState} from './types';
import {useDispatch, useSelector} from 'react-redux';
import {listCreateRequest} from './actions';

const initFormValues: CreateListFormState = {
  name: '',
  description: '',
};

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

  const onSubmit = (values: CreateListFormState) => {
    dispatch(listCreateRequest(values));
  };

  return (
    <Formik
      initialValues={initFormValues}
      validationSchema={CreateListSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={onSubmit}>
      {props => {
        const {values, handleSubmit, setFieldError, setFieldValue, errors} =
          props;
        return (
          <View style={styles.container}>
            <TextInput
              mode="outlined"
              label="Name"
              error={Boolean(errors.name)}
              value={values.name}
              onChangeText={(value: string) => {
                setFieldValue('name', value);
                setFieldError('name', '');
              }}
            />
            <HelperText type="error" visible={Boolean(errors.name)}>
              {errors.name}
            </HelperText>
            <TextInput
              mode="outlined"
              label="Description"
              error={Boolean(errors.description)}
              value={values.description}
              onChangeText={(value: string) => {
                setFieldValue('description', value);
                setFieldError('description', '');
              }}
            />
            <HelperText type="error" visible={Boolean(errors.description)}>
              {errors.description}
            </HelperText>
            <Button
              onPress={handleSubmit}
              mode="contained"
              loading={listCreating}>
              Create
            </Button>
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default CreateListModal;
