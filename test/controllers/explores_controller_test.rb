require 'test_helper'

class ExploresControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get explores_index_url
    assert_response :success
  end

end
