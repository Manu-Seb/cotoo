import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ViewStyle } from 'react-native';
import Colors from '../constants/Colors';

interface AddCommentProps {
    onClose: () => void;
    onAddComment: (comment: string) => void;
    style?: ViewStyle;
}

const AddComment: React.FC<AddCommentProps> = ({ onClose, onAddComment, style }) => {
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
        <View style={[styles.container, style]}>
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
            <Button title="Close" onPress={onClose} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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