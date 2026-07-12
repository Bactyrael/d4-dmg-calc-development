with open("app.js", "r", encoding="utf-8") as f:
    content = f.read()

# Replace `    calculate();\n  }\n` inside loadBuildToUI
start_idx = content.find("function loadBuildToUI")
if start_idx != -1:
    end_idx = content.find("  }", start_idx)
    # The end of the function looks like:
    #     } finally {
    #       isLoading = false;
    #     }
    #     calculate();
    #   }
    
    target = """    } finally {
      isLoading = false;
    }
    calculate();"""
    
    replacement = """    } finally {
      isLoading = false;
    }
    if (typeof renderTalismanUI === 'function') renderTalismanUI();
    calculate();"""
    
    content = content.replace(target, replacement)
    
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(content)
    print("Injected renderTalismanUI into loadBuildToUI.")
