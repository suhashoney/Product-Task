import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  // Declaring variables 
  const [refresh, setRefresh] = useState(new Date())
  const [main, setMain] = useState([])
  const [product, setProduct] = useState([])
  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [editId, setEditId] = useState('')
  const [show, setShow] = useState(false)
  const [image, setImage] = useState([])

  // creating add form field data
  const [form, setForm] = useState({
    name: '',
    detail: '',
    price: '',
    quantity: '',
    total_price: '',
    date: '',
  })

  // creating edit form field data
  const [editForm, setEditForm] = useState({
    name: '',
    detail: '',
    price: '',
    quantity: '',
    total_price: '',
    date: '',
  })

  // Sorting the data set asc and desc
  const [dataSort, setDataSort] = useState({
    name: 1,
    detail: 1,
    price: 1,
    quantity: 1,
    total_price: 1,
    date: 1,
  })

  // Fetch the initial data for show product list
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      if (mounted) {
        let data = JSON.parse(localStorage["product"])
        if (data != '' && data.length > 0) {
          setProduct(data);
          setMain(data)
          setRefresh(new Date())
        }

      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  // For add product data here
  const AddProduct = async (e) => {
    try {
      let list = main;
      let newData = form;
      let req = {
        id: list.length + 1,
        image: image,
      };
      newData = { ...newData, ...req };

      list.push(newData)
      localStorage.setItem("product", JSON.stringify(list));
      setProduct(product)
      setMain(product)
      setImage('')
      e.target.reset();
      setShow(false)
      setRefresh(new Date())
    } catch (error) {
      alert(error)
    }
  }

  // Delete confirm modal open
  const openConfirmModal = () => {
    let filter = main;
    filter = filter.filter((img) => img.id !== deleteId);
    localStorage.setItem("product", JSON.stringify(filter));
    setProduct(filter)
    setMain(filter)
    setDeleteId('')
    setModal(false)
    setRefresh(new Date())
  };

  // Open edit modal for edit data
  const handleEdit = (e) => {
    try {
      var datas = main.find((img) => img.id === e);
      setEditForm((editForm) => {
        return {
          ...editForm,
          name: datas.name,
          detail: datas.detail,
          price: datas.price,
          quantity: datas.quantity,
          total_price: datas.total_price,
          date: datas.date,
        }
      });
      setEditId(e)
      setEditModal(true)
    } catch (error) {
      alert(error)
    }
  };

  // Editing the product data
  const EditProduct = (e) => {
    try {
      var data = main;
      var index = main.findIndex((img) => img.id === editId);
      if (image != '') {
        data[index].image = image
      }
      data[index].name = editForm.name
      data[index].detail = editForm.detail
      data[index].price = editForm.price
      data[index].quantity = editForm.quantity
      data[index].total_price = editForm.total_price
      data[index].date = editForm.date
      setMain(data)
      setImage('')
      setProduct(data)
      localStorage.setItem("product", JSON.stringify(data));
      setRefresh(new Date())
      setEditModal(false)
      setEditId('')
      e.target.reset();
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="container">
      <table className="table">
        {/* Table header */}
        <thead>
          <tr>
            <th>
              Image
            </th>
            <th onClick={(e) => {
              var data = main;
              if (dataSort.name == 1) {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    name: 2,

                  }
                });
                var sorted = data.sort((a, b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0));
                setProduct(sorted)
                setRefresh(new Date())
              } else {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    name: 1,

                  }
                });
                var sorted = data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                setProduct(sorted)
                setRefresh(new Date())
              }
            }}>
              {dataSort.name == 1 ? (
                <span>Product Name &uarr;</span>
              ) : (
                <span>Product Name 	&darr;</span>
              )}
            </th>
            <th onClick={(e) => {
              var data = main;
              if (dataSort.detail == 1) {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    detail: 2,

                  }
                });
                var sorted = data.sort((a, b) => (b.detail > a.detail) ? 1 : ((a.detail > b.detail) ? -1 : 0));
                setProduct(sorted)
                setRefresh(new Date())
              } else {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    detail: 1,

                  }
                });
                var sorted = data.sort((a, b) => (a.detail > b.detail) ? 1 : ((b.detail > a.detail) ? -1 : 0));
                setProduct(sorted)
                setRefresh(new Date())
              }
            }}>
              {dataSort.detail == 1 ? (
                <span>Details &uarr;</span>
              ) : (
                <span>Details 	&darr;</span>
              )}
            </th>
            <th onClick={(e) => {
              var data = main;
              if (dataSort.price == 1) {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    price: 2,

                  }
                });
                var sorted = data.sort((a, b) => a.price - b.price);;
                setProduct(sorted)
                setRefresh(new Date())
              } else {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    price: 1,

                  }
                });
                var sorted = data.sort((a, b) => b.price - a.price);;
                setProduct(sorted)
                setRefresh(new Date())
              }
            }}>
              {dataSort.price == 1 ? (
                <span>Price &uarr;</span>
              ) : (
                <span>Price 	&darr;</span>
              )}
            </th>
            <th onClick={(e) => {
              var data = main;
              if (dataSort.quantity == 1) {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    quantity: 2,

                  }
                });
                var sorted = data.sort((a, b) => a.quantity - b.quantity);;
                setProduct(sorted)
                setRefresh(new Date())
              } else {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    quantity: 1,

                  }
                });
                var sorted = data.sort((a, b) => b.quantity - a.quantity);;
                setProduct(sorted)
                setRefresh(new Date())
              }
            }}>
              {dataSort.quantity == 1 ? (
                <span>Quantity &uarr;</span>
              ) : (
                <span>Quantity 	&darr;</span>
              )}
            </th>
            <th onClick={(e) => {
              var data = main;
              if (dataSort.total_price == 1) {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    total_price: 2,

                  }
                });
                var sorted = data.sort((a, b) => a.total_price - b.total_price);;
                setProduct(sorted)
                setRefresh(new Date())
              } else {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    total_price: 1,

                  }
                });
                var sorted = data.sort((a, b) => b.total_price - a.total_price);;
                setProduct(sorted)
                setRefresh(new Date())
              }
            }}>
              {dataSort.total_price == 1 ? (
                <span>Total Price &uarr;</span>
              ) : (
                <span>Total Price 	&darr;</span>
              )}
            </th>
            <th onClick={(e) => {
              var data = main;
              if (dataSort.date == 1) {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    date: 2,

                  }
                });
                var sorted = data.sort((a, b) => (b.date > a.date) ? 1 : ((a.date > b.date) ? -1 : 0));
                setProduct(sorted)
                setRefresh(new Date())
              } else {
                setDataSort((dataSort) => {
                  return {
                    ...dataSort,
                    date: 1,

                  }
                });
                var sorted = data.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
                setProduct(sorted)
                setRefresh(new Date())
              }
            }}>
              {dataSort.date == 1 ? (
                <span>Created Date &uarr;</span>
              ) : (
                <span>Created Date 	&darr;</span>
              )}
            </th>
            <th>
              Action
            </th>
          </tr>
        </thead>

        {/* For search the data */}
        <thead>
          <tr>
            <th>
            </th>
            <th>
              <input required type="text" onChange={(e) => {
                if (e.target.value != '') {
                  let filter = main;
                  filter = filter.filter((img) => img.name.toString().toLowerCase().includes(e.target.value));
                  setProduct(filter)
                  setRefresh(new Date())
                } else {
                  setProduct(main)
                  setRefresh(new Date())
                }
              }} />
            </th>
            <th>
              <input required type="text" onChange={(e) => {
                if (e.target.value != '') {
                  let filter = main;
                  filter = filter.filter((img) => img.detail.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()));
                  setProduct(filter)
                  setRefresh(new Date())
                } else {
                  setProduct(main)
                  setRefresh(new Date())
                }
              }} />
            </th>
            <th>
              <input required type="number" onChange={(e) => {
                if (e.target.value != '') {
                  let filter = main;
                  filter = filter.filter((img) => (img.price).includes(Number(e.target.value)));
                  setProduct(filter)
                  setRefresh(new Date())
                } else {
                  setProduct(main)
                  setRefresh(new Date())
                }
              }} />
            </th>
            <th>
              <input required type="number" onChange={(e) => {
                if (e.target.value != '') {
                  let filter = main;
                  filter = filter.filter((img) => (img.quantity).includes(Number(e.target.value)));
                  setProduct(filter)
                  setRefresh(new Date())
                } else {
                  setProduct(main)
                  setRefresh(new Date())
                }
              }} />
            </th>
            <th>
              <input required type="number" onChange={(e) => {
                if (e.target.value != '') {
                  let filter = main;
                  filter = filter.filter((img) => (img.total_price).includes(Number(e.target.value)));
                  setProduct(filter)
                  setRefresh(new Date())
                } else {
                  setProduct(main)
                  setRefresh(new Date())
                }
              }} />
            </th>
            <th>
              <input required type="date" onChange={(e) => {
                if (e.target.value != '') {
                  let filter = main;
                  filter = filter.filter((img) => img.date.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()));
                  setProduct(filter)
                  setRefresh(new Date())
                } else {
                  setProduct(main)
                  setRefresh(new Date())
                }

              }} />
            </th>
            <th>
            </th>
          </tr>
        </thead>

        {/* Show the list of data */}
        <tbody key={refresh}>
          {product.length > 0 ? (
            <>
              {product.map((row, index) => (
                <tr key={row.id}>
                  <td> <img src={row.image} width="100px" /></td>
                  <td>{row.name}</td>
                  <td>{row.detail}</td>
                  <td>{row.price}</td>
                  <td>{row.quantity}</td>
                  <td>{row.total_price}</td>
                  <td>{row.date}</td>
                  <td>  <button type="submit" style={{ backgroundColor: ' #03A9F4' }} onClick={(e) => handleEdit(row.id)} className='button'>Edit</button> &nbsp; &nbsp;
                    <button style={{ backgroundColor: '#F44336' }} className='button' onClick={(e) => {
                      setDeleteId(row.id);
                      setModal(true)
                    }}>Delete</button></td>
                </tr>
              ))}
            </>
          ) : null}
        </tbody>
      </table>
      {/* For add the product data */}
      {show == true ? (
        <form onSubmit={(e) => { e.preventDefault(); AddProduct(e) }}>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <input required type="file" onChange={(e) => {
                    const reader = new FileReader()
                    reader.addEventListener("load", function () {
                      // convert image file to base64 string and save to localStorage
                      setImage(reader.result)
                    }, false);
                    reader.readAsDataURL(e.target.files[0])
                  }} />
                </th>
                <th>
                  <input type="text" placeholder="Product Name" required onChange={(e) => setForm((form) => {
                    return {
                      ...form,
                      name: e.target.value,
                    }
                  })} />
                </th>
                <th>
                  <input type="text" placeholder="Product Details" required onChange={(e) => setForm((form) => {
                    return {
                      ...form,
                      detail: e.target.value,
                    }
                  })} />
                </th>

                <th>
                  <input type="number" placeholder="Price" required onChange={(e) => setForm((form) => {
                    return {
                      ...form,
                      price: e.target.value,
                    }
                  })} />
                </th>

                <th>
                  <input type="number" placeholder="Quantity" required onChange={(e) => setForm((form) => {
                    return {
                      ...form,
                      quantity: e.target.value,
                    }
                  })} />
                </th>

                <th>
                  <input type="number" placeholder="Total Price" required onChange={(e) => setForm((form) => {
                    return {
                      ...form,
                      total_price: e.target.value,
                    }
                  })} />
                </th>

                <th>
                  <input type="date" placeholder="Select Date" required onChange={(e) => setForm((form) => {
                    return {
                      ...form,
                      date: e.target.value,
                    }
                  })} />
                </th>
                <th>
                  <button type="submit" style={{ backgroundColor: ' #03A9F4' }} className='button'>Submit</button>
                </th>
              </tr>
            </thead>
          </table>
          <div>
          </div>
        </form>
      ) : null}

      {/* Add  */}
      <div style={{ textAlign: 'right', marginTop: 10 }}>
        <button className='button' style={{ backgroundColor: ' #4CAF50' }} onClick={() => setShow(true)}>Add More</button>
      </div >
      {modal == true ? (
        <div className="modal">
          <div className="modal-inside">
            <span className="modal-close " onClick={() => {
              setDeleteId('');
              setModal(false)
            }}>&times;</span>
            <div style={{ textAlign: 'center', }}>
              <h1 style={{ color: 'red', fontSize: 40, border: '1px solid red', borderRadius: '50%', width: 50, textAlign: 'center', margin: 'auto', }}>X</h1>
              <p style={{ fontSize: 20, }}>Are you sure ?</p>
              <button type="submit" style={{ backgroundColor: ' #9E9E9E' }} className='button' onClick={() => {
                setDeleteId('');
                setModal(false)
              }}>Cance</button> &nbsp; &nbsp;
              <button style={{ backgroundColor: '#F44336' }} className='button' onClick={(e) => {
                openConfirmModal()

              }}>Delete</button>
            </div>
          </div>
        </div>
      ) : null}

      {editModal == true ? (
        <div className="modal">
          <div className="modal-inside">
            <span className="modal-close " onClick={() => {
              setEditId('');
              setEditModal(false)
            }}>&times;</span>
            <form onSubmit={(e) => { e.preventDefault(); EditProduct(e) }}>
              <table className="">
                <thead>
                  <tr>
                    <th>
                      <input type="file" onChange={(e) => {
                        const reader = new FileReader()
                        reader.addEventListener("load", function () {
                          // convert image file to base64 string and save to localStorage
                          setImage(reader.result)
                        }, false);
                        reader.readAsDataURL(e.target.files[0])
                      }} />
                    </th>
                    <th>
                      <label >Name</label> <br />
                      <input type="text" required value={editForm.name} onChange={(e) => setEditForm((editForm) => {
                        return {
                          ...editForm,
                          name: e.target.value,
                        }
                      })} />
                    </th>
                    <th>
                      <label >Details</label> <br />
                      <input type="text" required value={editForm.detail} onChange={(e) => setEditForm((editForm) => {
                        return {
                          ...editForm,
                          detail: e.target.value,
                        }
                      })} />
                    </th>
                    <th>
                      <label >Price</label> <br />
                      <input type="number" value={editForm.price} required onChange={(e) => setEditForm((editForm) => {
                        return {
                          ...editForm,
                          price: e.target.value,
                        }
                      })} />
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <label >Quantity</label> <br />
                      <input type="number" value={editForm.quantity} required onChange={(e) => setEditForm((editForm) => {
                        return {
                          ...editForm,
                          quantity: e.target.value,
                        }
                      })} />
                    </th>
                    <th>
                      <label >Total Price</label> <br />
                      <input type="number" required value={editForm.total_price} onChange={(e) => setEditForm((editForm) => {
                        return {
                          ...editForm,
                          total_price: e.target.value,
                        }
                      })} />
                    </th>
                    <th>
                      <label >Created Date</label> <br />
                      <input type="date" value={editForm.date} required onChange={(e) => setEditForm((editForm) => {
                        return {
                          ...editForm,
                          date: e.target.value,
                        }
                      })} />
                    </th>
                  </tr>
                </thead>
              </table>
              <div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <button type="submit" style={{ backgroundColor: ' #03A9F4' }} className='button'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
