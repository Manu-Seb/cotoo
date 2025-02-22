import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

interface AddCommentProps {
    visible: boolean;
    onClose: () => void;
    onAddComment: (comment: string) => void;
}

const AddComment: React.FC<AddCommentProps> = ({ visible, onClose, onAddComment }) => {
    const [comment, setComment] = useState('');

    const handleAddComment = () => {
        if (comment.length <= 500) {
            onAddComment(comment);
            setComment('');
            onClose();
        } else {
            alert('Comment cannot exceed 500 characters');
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Comments</Text>
                    <TextInput
                        style={styles.input}
                        multiline
                        numberOfLines={4}
                        maxLength={500}
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Write your comment here..."
                    />
                    <Button title="Add Comment" onPress={handleAddComment} color={Colors.pastelYellow} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: 'black',
    },
    input: {
        width: '100%',
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
    },
});

export default AddComment;