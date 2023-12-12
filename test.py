import os
from graphviz import Digraph


class GitTreeVisualizer:
    def __init__(self, repo_path: str):
        self.repo_path = repo_path
        self.dot = Digraph(comment='Git Repository Tree')

    def build_tree_graph(self, folder_path='', parent_node=None):
        current_path = os.path.join(self.repo_path, folder_path)
        files = os.listdir(current_path)

        for file in files:
            file_path = os.path.join(folder_path, file)
            full_path = os.path.join(self.repo_path, file_path)

            if os.path.isdir(full_path):
                # Recursively build tree for subdirectories
                self.build_tree_graph(file_path, parent_node=parent_node)

            # Add nodes and edges to the graph
            node_label = f'{file_path}\n({file})'
            self.dot.node(file_path, label=node_label)
            if parent_node:
                self.dot.edge(parent_node, file_path)

    def visualize_tree(self):
        self.build_tree_graph()
        self.dot.render('git_tree', format='png', cleanup=True)

        # Provide feedback to the user
        print(f"Git Repository Tree visualization saved as 'git_tree.png'")


if __name__ == "__main__":
    repo_path = input("Enter the full path to the local Git repository: ")

    if os.path.exists(os.path.join(repo_path, '.git')):
        visualizer = GitTreeVisualizer(repo_path)
        visualizer.visualize_tree()
    else:
        print("Error: This does not seem to be a valid Git repository.")
