module ViewHelpers
  def html
    if @flat_html == true
      return ".html"
    else
      return ""
    end
  end
end