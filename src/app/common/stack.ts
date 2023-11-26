export class Stack<T> {
    // An array to store the elements of the stack
    private storage: T[] = [];
  
    // A method to add an element to the top of the stack
    public push(element: T) {
      this.storage.push(element);
    }
  
    // A method to remove and return the top element of the stack
    public pop(): T | undefined {
      return this.storage.pop();
    }
  
    // A method to return the top element of the stack without removing it
    public peek(): T | undefined {
      return this.storage[this.storage.length - 1];
    }
  
    // A method to check if the stack is empty
    public isEmpty(): boolean {
      return this.storage.length === 0;
    }
  
    // A method to return the size of the stack
    public size(): number {
      return this.storage.length;
    }
  }
  