import Func "mo:base/Func";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";

actor {
  type BlogCreationStep = {
    id: Nat;
    title: Text;
    description: Text;
    prompt: Text;
  };

  stable var blogCreationStepsArray: [BlogCreationStep] = [];
  var blogCreationStepsBuffer: Buffer.Buffer<BlogCreationStep> = Buffer.Buffer(0);

  private func initBlogCreationSteps() {
    blogCreationStepsBuffer.add({
      id = 1;
      title = "1. Design the Layout";
      description = "Start by creating the basic HTML structure and CSS for your blog.";
      prompt = "Create a simple and clean HTML and CSS layout for a blog homepage. Include a header with a logo and navigation menu, a main content area for blog posts, and a sidebar for categories and recent posts. Use flexbox or grid for responsive design.";
    });
    blogCreationStepsBuffer.add({
      id = 2;
      title = "2. Implement Blog Post Functionality";
      description = "Set up the backend to handle blog posts.";
      prompt = "Using Node.js and Express, create a basic server setup for a blog. Include routes for viewing all posts, individual posts, and creating new posts. Use a simple JSON file for data storage. Provide code for the server setup and main routes.";
    });
    blogCreationStepsBuffer.add({
      id = 3;
      title = "3. Add a Comment System";
      description = "Implement a comment system for blog posts.";
      prompt = "Extend the blog functionality to include a comment system. Create a form for users to submit comments on blog posts, and display the comments below each post. Update the server to handle comment submission and retrieval. Provide the necessary HTML, JavaScript, and server-side code.";
    });
    blogCreationStepsBuffer.add({
      id = 4;
      title = "4. Implement Search Functionality";
      description = "Add a search feature to find blog posts.";
      prompt = "Add a search functionality to the blog. Create a search input in the header, and implement server-side logic to search through blog posts based on title or content. Return and display the search results. Provide the frontend and backend code for this feature.";
    });
  };

  public query func getBlogCreationSteps(): async [BlogCreationStep] {
    Buffer.toArray(blogCreationStepsBuffer)
  };

  public func updateBlogCreationStep(id: Nat, step: BlogCreationStep): async Result.Result<BlogCreationStep, Text> {
    let index = Buffer.indexOf<BlogCreationStep>(
      { id = id; title = ""; description = ""; prompt = "" },
      blogCreationStepsBuffer,
      func(a, b) { a.id == b.id }
    );

    switch (index) {
      case null {
        #err("Step not found")
      };
      case (?i) {
        blogCreationStepsBuffer.put(i, step);
        #ok(step)
      };
    }
  };

  system func preupgrade() {
    blogCreationStepsArray := Buffer.toArray(blogCreationStepsBuffer);
  };

  system func postupgrade() {
    blogCreationStepsBuffer := Buffer.fromArray(blogCreationStepsArray);
    if (blogCreationStepsBuffer.size() == 0) {
      initBlogCreationSteps();
    };
  };
}
