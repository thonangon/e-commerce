import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CheckInComponent = () => {
    const [showModal, setShowModal] = useState(false);
    return (
      <Center>
        <Button onPress={() => setShowModal(true)}>Open Modal</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>CHECKOUT</Modal.Header>
            <Modal.Body>
              <ScrollView>
                <VStack flex="1" justifyContent="space-between">
                  <Text>SHIPPING</Text>
                  <IconButton
                    icon={<Icon name="ellipsis-vertical-outline" size={20} color="black" />}
                  />
                  Free Delivery
                </VStack>
                <VStack flex="1" justifyContent="space-between">
                  <Text>TOTAL</Text>
                  <IconButton
                    icon={<Icon name="ellipsis-vertical-outline" size={20} color="black" />}
                  />
                  $350.00
                </VStack>
              </ScrollView>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button onPress={() => setShowModal(false)}>
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };

export default CheckInComponent

const styles = StyleSheet.create({})