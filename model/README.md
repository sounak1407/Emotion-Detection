# Emotion-Detection-Using-Deep-Learning-

How to use the model in Django:

- In views.py add this statement
```sh
  from Model import Net
```
- Now load the model using following statements:
```sh
  model_load = Net()
  model_load.load_state_dict(torch.load('best_checkpoint.model'))
  model_load.eval()
```
- Create a view named "convert_image" with parameter "image"
  ```sh
  def convert_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, (48, 48))
    gray1 = gray.copy()

    gray_np = np.array([[gray]])
    final_image = Variable(torch.Tensor(gray_np))

    return final_image, gray1
  ```
- Use this statement to test any image
  ```sh
  output = model_load(image)
  ```
  the output gives the prediction
