// Initialize the game
Set secretWord to a randomly chosen word from array
Set maxAttempts to the maximum number of incorrect guesses allowed
Set attempts to 0
Set guessedLetters to an empty list


Main game loop
While attempts < maxAttempts:
    // Display game information
    Display the current state of the spaceman
    Display the secret word with underscores for unguessed letters
    Display the guessed letters
    
    // Get user input
    Prompt the user to guess a letter
    Read the user's input
    
    // Process the user's guess
    If the guessed letter is in the secretWord:
        Add the guessed letter to the guessedLetters list
        If all letters in the secretWord have been guessed:
            Display a victory message
            Break out of the loop
    Else:
        Increment attempts by 1
    
// Game over
If attempts equals maxAttempts:
    Display a defeat message and reveal the secretWord
