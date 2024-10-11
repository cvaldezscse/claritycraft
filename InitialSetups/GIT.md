### Step 1: Install Git
- **For Windows**:
    - Download Git from the [official website](https://git-scm.com/download/win).
    - Run the downloaded `.exe` file and go through the installation steps, leaving the default options selected.
- **For macOS**:
    - Open the Terminal and type:        
        `git --version`
        If Git isn’t installed, you’ll be prompted to install it. Follow the prompts to install the Command Line Developer Tools.
    - Alternatively, you can download Git from the [official website](https://git-scm.com/download/mac) and follow the installation instructions.
- **For Linux**:
    - Open your terminal and run:
        `sudo apt update sudo apt install git`
    - For Fedora-based systems, use:
        `sudo dnf install git`

### Step 2: Configure Git
Now that Git is installed, let’s configure it with your GitHub credentials.
1. Open your terminal or Git Bash.
2. Set your Git username:
    `git config --global user.name "YourGitHubUsername"`
3. Set your email address associated with your GitHub account:
    `git config --global user.email "youremail@example.com"`
4. You can confirm the configuration with:
    `git config --list`

### Step 3: Generate an SSH Key
An SSH key allows you to securely connect to GitHub without repeatedly entering your password.

1. In your terminal, generate a new SSH key:
    `ssh-keygen -t ed25519 -C "youremail@example.com"`
    
    If you receive an error, use:
    `ssh-keygen -t rsa -b 4096 -C "youremail@example.com"`
    
2. When prompted, press **Enter** to save the key in the default location. Then, you’ll be asked for a passphrase (optional but recommended).

### Step 4: Add the SSH Key to the SSH Agent

1. Start the SSH agent:
    `eval "$(ssh-agent -s)"`
2. Add your SSH key to the agent:
    `ssh-add ~/.ssh/id_ed25519`
    
    If you used the RSA method, use:
    `ssh-add ~/.ssh/id_rsa`

### Step 5: Add the SSH Key to Your GitHub Account

1. Copy your SSH key to your clipboard:
    `cat ~/.ssh/id_ed25519.pub`    
    Or for RSA:
    `cat ~/.ssh/id_rsa.pub`
    Copy the output that starts with `ssh-ed25519` or `ssh-rsa`.
    - Go to [GitHub](https://github.com) and sign in.
2. Navigate to **Settings** > **SSH and GPG keys** > **New SSH key**.
3. Paste your SSH key, give it a title, and click **Add SSH key**.


### Step 6: Test the Connection
1. In your terminal, test your SSH connection to GitHub:
    `ssh -T git@github.com`
    
2. If this is your first connection, type “yes” to continue. You should see a message like:
    `Hi YourGitHubUsername! You've successfully authenticated, but GitHub does not provide shell access.`

Once you see this, you’re all set up! You can now use Git to clone, push, and pull repositories on GitHub. Let me know if you’d like to go over any additional tools or configurations!
