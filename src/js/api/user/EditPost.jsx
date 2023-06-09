import React, { useState } from "react";
import { fetchToken } from "../fetchToken.jsx";
import { Form, Button } from "react-bootstrap";

function EditPost(props) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [media, setMedia] = useState("");

  function onFormSubmit(event) {
    event.preventDefault();

    const postBody = {
      id,
      title,
      body,
      media,
    };

    fetchToken(`https://nf-api.onrender.com/api/v1/social/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(postBody),
    }).then((response) => {
      if (response.status === 200) {
        alert("The post is updated!");
      } else {
        alert("Something went wrong. Please try agian");
      }
    });
  }

  function onIdChange(event) {
    setId(event.target.value);
  }

  function onTitleChange(event) {
    setTitle(event.target.value);
  }

  function onBodyChange(event) {
    setBody(event.target.value);
  }

  function onMediaChange(event) {
    setMedia(event.target.value);
  }

  return (
    <div className="edit__post">
      <Form onSubmit={onFormSubmit}>
        <h2 className="text-center mt-4 mb-2">Edit a post</h2>
        <Form.Group className="form-input mb-2">
          <Form.Label>ID</Form.Label>
          <Form.Control
            value={id}
            placeholder="Enter the post ID of the post you want to edit"
            onChange={onIdChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="form-input mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            placeholder="Update title"
            onChange={onTitleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="form-input mb-2">
          <Form.Label>Body</Form.Label>
          <Form.Control
            value={body}
            placeholder="write your text"
            onChange={onBodyChange}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="form-input mb-2">
          <Form.Label>Media</Form.Label>
          <Form.Control
            value={media}
            placeholder="add url"
            onChange={onMediaChange}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
}

export default EditPost;
